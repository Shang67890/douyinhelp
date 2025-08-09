import type { FC } from 'react';
import { HelpCircle } from 'lucide-react';

const FAQ: FC = () => {
  const faqs = [
    {
      q: '评估结果的准确性如何？',
      a: '评估基于算法规则与大模型分析，结合您提供的材料质量与账号历史；结果仅供参考，最终以平台官方审核为准。我们持续迭代规则并引入样本校准以提升稳定性。'
    },
    {
      q: '哪些材料能显著提升成功率？',
      a: '账号合规承诺与整改说明、原创/授权证明、关键页面截图（封禁提示、消息记录）、绑定信息与实名证明、历史运营数据与投放证明等。'
    },
    {
      q: '“永久封禁”是否有机会解开？',
      a: '根据经验，永久封禁并不意味着完全无法恢复。若能提供充分的历史贡献与整改方案，成功率在部分场景中反而高于短期封禁。'
    },
    {
      q: '多久可以出评估结果？',
      a: '提交信息后通常数秒内生成评估报告；若外部服务波动，将启用本地规则进行兜底评估，确保可用性。'
    },
    {
      q: '是否建议多次申诉？',
      a: '是。合理的多次申诉配合材料完善可提高成功率，但应注意间隔与内容更新，避免重复提交。'
    },
    {
      q: '我的隐私信息如何处理？',
      a: '我们建议对敏感数据做脱敏处理。若开启数据记录，仅用于改进评估质量且遵守隐私合规要求。'
    }
  ];

  return (
    <section id="faq" className="max-w-4xl mx-auto mt-16">
      <div className="flex items-center mb-4">
        <HelpCircle className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">常见问题 FAQ</h2>
      </div>
      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <details key={idx} className="bg-white rounded-lg shadow p-4">
            <summary className="cursor-pointer font-medium text-gray-800">{item.q}</summary>
            <p className="mt-2 text-sm text-gray-700 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
