import { AccountInfo, AssessmentResult } from '../types';

const API_KEY = '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';
const API_BASE_URL = 'https://openrouter.ai/api/v1';

export const assessAccount = async (accountInfo: AccountInfo): Promise<AssessmentResult> => {
  try {
    const prompt = `
作为抖音账号解封专家，请分析以下账号信息并提供专业评估（仅返回JSON）：

账号信息：
- 账号ID: ${accountInfo.accountId}
- 账号类型: ${accountInfo.accountType}
- 账号注册时长: ${accountInfo.accountAge}
- 粉丝数量: ${accountInfo.followerCount}
- 内容类型: ${accountInfo.contentType}
- 是否实名认证: ${accountInfo.hasVerification ? '是' : '否'}
- 绑定手机号是否本人实名开户: ${accountInfo.isPhoneRealName ? '是' : '否'}
- 绑定手机号是否还在使用: ${accountInfo.isPhoneActive ? '是' : '否'}
- 当前账号状态: ${accountInfo.accountStatus}
- 投放/充值金额: ${accountInfo.rechargeAmount}
- 封禁时长: ${accountInfo.banDuration}
- 封禁原因: ${accountInfo.banReason}
- 系统提示的封禁理由描述: ${accountInfo.violationContent}
- 历史申诉次数: ${accountInfo.previousAppeals}

评估规则偏好（重要）：
1) 封禁时长越短越难解开，"永久封禁"反而相对容易（请综合判定而非机械套用）。
2) 申诉次数越多，说明持续跟进与材料完善，解封成功率越高。
3) 实名、手机号实名且在用、账号历史价值（粉丝/投放金额）对解封有正向影响；脚本/刷量类违规负面影响较大。

请按照以下JSON格式返回评估结果（只返回JSON，不要多余文本）：
{
  "successRate": 数字(0-100),
  "analysis": "详细分析文本，包含账号状况、违规严重程度、解封可能性等",
  "recommendedPath": "推荐的申诉路径，如官方申诉、客服联系、邮件申诉等",
  "riskFactors": ["风险因素1", "风险因素2", "风险因素3"],
  "suggestions": ["建议1", "建议2", "建议3", "建议4"]
}
`;

    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': '抖音账号解封智能测评工具',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      // 尝试解析JSON响应
      const result = JSON.parse(content);
      return result;
    } catch (parseError) {
      // 如果解析失败，返回默认结果
      console.error('JSON解析失败:', parseError);
      return generateFallbackResult(accountInfo);
    }
  } catch (error) {
    console.error('API调用失败:', error);
    // 返回基于规则的评估结果作为后备方案
    return generateFallbackResult(accountInfo);
  }
};

// 后备评估逻辑
const generateFallbackResult = (accountInfo: AccountInfo): AssessmentResult => {
  let successRate = 50; // 基础成功率
  const riskFactors: string[] = [];
  const suggestions: string[] = [];

  // 根据封禁时长调整（新的业务规则：越短越难，永久更易）
  switch (accountInfo.banDuration) {
    case '1天':
      successRate -= 20;
      riskFactors.push('近期短期封禁通常审核严格');
      break;
    case '3天':
      successRate -= 18;
      break;
    case '7天':
      successRate -= 12;
      break;
    case '30天':
      successRate -= 5;
      break;
    case '180天':
      successRate += 10;
      break;
    case '永久封禁':
      successRate += 20;
      suggestions.push('永久封禁可侧重历史贡献与整改承诺');
      break;
  }

  // 根据封禁原因调整（使用新分类）
  switch (accountInfo.banReason) {
    case '刷粉刷赞':
      successRate -= 20;
      riskFactors.push('刷量行为被严格监管');
      break;
    case '脚本违规':
      successRate -= 18;
      riskFactors.push('自动化脚本违规风险高');
      break;
    case '恶意营销':
      successRate -= 15;
      break;
    case '直播违规':
    case '直播连带违规':
      successRate -= 12;
      break;
    case '作品内容违规':
      successRate -= 10;
      break;
    case '私信评论违规':
      successRate -= 5;
      break;
    case '侵权投诉':
      successRate += 5;
      suggestions.push('提供原创/授权证明材料');
      break;
    case '其他违规':
      break;
  }

  // 历史申诉次数：越多越高
  if (accountInfo.previousAppeals === 0) {
    successRate -= 5;
    suggestions.push('建议尽快发起首次申诉，态度诚恳');
  } else if (accountInfo.previousAppeals <= 2) {
    successRate += 5;
  } else if (accountInfo.previousAppeals <= 5) {
    successRate += 10;
    suggestions.push('持续跟进并逐步完善材料');
  } else {
    successRate += 15;
    suggestions.push('保持跟进频率与材料质量，耐心等待审核');
  }

  // 账号年龄
  switch (accountInfo.accountAge) {
    case '2年以上':
      successRate += 12;
      suggestions.push('老账号强调历史贡献与合规经营');
      break;
    case '1-2年':
      successRate += 8;
      break;
    case '1个月内':
      successRate -= 8;
      riskFactors.push('新账号缺乏历史记录');
      break;
  }

  // 实名与手机号情况
  if (accountInfo.hasVerification) {
    successRate += 8;
    suggestions.push('实名认证提升可信度');
  } else {
    riskFactors.push('未实名认证可能影响审核信任');
  }

  if (accountInfo.isPhoneRealName) {
    successRate += 6;
  } else {
    riskFactors.push('绑定手机号非本人实名');
    successRate -= 4;
  }

  if (accountInfo.isPhoneActive) {
    successRate += 4;
    suggestions.push('保持绑定手机号畅通，便于核验');
  } else {
    riskFactors.push('绑定手机号不在使用，可能影响核验');
    successRate -= 4;
  }

  // 当前账号状态
  switch (accountInfo.accountStatus) {
    case '无法登陆':
      successRate -= 12;
      riskFactors.push('当前无法登陆，需提供更多辅助证明');
      break;
    case '禁言':
      successRate -= 5;
      break;
    case '限流':
      successRate -= 2;
      break;
    case '封禁':
      successRate -= 8;
      riskFactors.push('账号处于封禁状态，需要提供充分整改说明');
      break;
  }

  // 投放/充值金额
  switch (accountInfo.rechargeAmount) {
    case '1000以上':
      successRate += 10;
      suggestions.push('强调历史投放与账号价值');
      break;
    case '1000以下':
      successRate += 5;
      break;
    case '0':
      successRate -= 3;
      break;
  }

  // 确保成功率在合理范围内
  successRate = Math.max(5, Math.min(95, successRate));

  // 添加通用建议
  suggestions.push(
    '详细描述整改措施与后续合规计划',
    '准备截图/链接等证据材料',
    '用语客观、事实清晰，避免情绪化表达',
    '选择与问题相匹配的官方申诉渠道'
  );

  if (riskFactors.length === 0) {
    riskFactors.push('申诉材料不充分', '整改措施不明确');
  }

  const recommendedPath = successRate > 70
    ? '官方申诉渠道 + 客服辅助'
    : successRate > 40
    ? '多渠道申诉 + 专业指导'
    : '专业代办服务 + 法律途径';

  const analysis = `根据您的账号情况分析：账号类型为${accountInfo.accountType}，当前状态${accountInfo.accountStatus}；因${accountInfo.banReason}被封禁${accountInfo.banDuration}。账号注册${accountInfo.accountAge}，粉丝${accountInfo.followerCount}，投放/充值金额为${accountInfo.rechargeAmount}。实名认证：${accountInfo.hasVerification ? '已认证' : '未认证'}；手机号实名：${accountInfo.isPhoneRealName ? '是' : '否'}，是否在用：${accountInfo.isPhoneActive ? '是' : '否'}。综合评估成功率为${successRate}%。${successRate > 70 ? '成功率较高，建议积极申诉并提供充分证明。' : successRate > 40 ? '成功率中等，请完善材料并耐心跟进。' : '成功率较低，建议寻求专业指导并准备更充分材料。'}`;

  return {
    successRate,
    analysis,
    recommendedPath,
    riskFactors: riskFactors.slice(0, 4),
    suggestions: suggestions.slice(0, 5)
  };
};