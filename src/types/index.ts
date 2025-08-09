export interface AccountInfo {
  accountId: string;
  accountType: 'personal_normal' | 'business_bluev' | 'staff_email' | 'yellowv_certified';
  banDuration: string;
  banReason: string;
  violationContent: string;
  previousAppeals: number;
  accountAge: string;
  followerCount: string;
  contentType: string;
  hasVerification: boolean;
  // 新增字段
  isPhoneRealName: boolean; // 账号当前绑定的手机号是否本人实名开户
  isPhoneActive: boolean;   // 账号当前绑定的手机号是否还在使用
  accountStatus: '禁言' | '限流' | '无法登陆' | '封禁'; // 当前账号状态
  rechargeAmount: '0' | '1000以下' | '1000以上'; // 投放/充值金额
}

export interface AssessmentResult {
  successRate: number;
  analysis: string;
  recommendedPath: string;
  riskFactors: string[];
  suggestions: string[];
}