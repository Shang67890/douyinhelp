import { useEffect, useRef, useState } from 'react';
import { AccountInfo } from '../types';
import { User, Clock, AlertTriangle, FileText, Users, Calendar, CheckCircle, Loader } from 'lucide-react';

interface AccountFormProps {
  onSubmit: (data: AccountInfo) => void;
  isLoading: boolean;
}

const AccountForm: React.FC<AccountFormProps> = ({ onSubmit, isLoading }) => {
  const DRAFT_KEY = 'account_form_draft_v1';

  const defaultFormData: AccountInfo = {
    accountId: '',
    accountType: 'personal_normal',
    banDuration: '',
    banReason: '',
    violationContent: '',
    previousAppeals: 0,
    accountAge: '',
    followerCount: '',
    contentType: '',
    hasVerification: false,
    // 新增字段
    isPhoneRealName: false,
    isPhoneActive: false,
    accountStatus: '禁言',
    rechargeAmount: '0',
  };

  const [formData, setFormData] = useState<AccountInfo>(defaultFormData);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
    } catch {}
  }, [formData]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        // 合并默认值，兼容新增字段
        setFormData({ ...defaultFormData, ...saved });
      }
      // 首次挂载后再允许保存，避免用默认值覆盖已有草稿
      mountedRef.current = true;
    } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(formData)); } catch {}
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="mb-8">
        <div className="text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">账号信息填写</h2>
          <p className="text-gray-600">请详细填写以下信息，我们将为您生成专业的解封评估报告</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 账号基本信息 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2" />
              抖音账号ID
            </label>
            <input
              type="text"
              name="accountId"
              value={formData.accountId}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="请输入抖音账号ID"
              required
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 mr-2" />
              账号类型
            </label>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="personal_normal">个人普通账号</option>
              <option value="business_bluev">企业蓝V账号</option>
              <option value="staff_email">员工邮箱账号</option>
              <option value="yellowv_certified">黄V认证账号</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-2" />
              账号注册时长
            </label>
            <select
              name="accountAge"
              value={formData.accountAge}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            >
              <option value="">请选择注册时长</option>
              <option value="1个月内">1个月内</option>
              <option value="1-6个月">1-6个月</option>
              <option value="6个月-1年">6个月-1年</option>
              <option value="1-2年">1-2年</option>
              <option value="2年以上">2年以上</option>
            </select>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 mr-2" />
              粉丝数量
            </label>
            <select
              name="followerCount"
              value={formData.followerCount}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            >
              <option value="">请选择粉丝数量</option>
              <option value="1000以下">1000以下</option>
              <option value="1000-1万">1000-1万</option>
              <option value="1万-10万">1万-10万</option>
              <option value="10万-100万">10万-100万</option>
              <option value="100万以上">100万以上</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 mr-2" />
              内容类型
            </label>
            <input
              type="text"
              name="contentType"
              value={formData.contentType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="如：生活记录、美食、教育等"
              required
            />
          </div>
          <div className="flex items-center mt-8">
            <input
              type="checkbox"
              name="hasVerification"
              checked={formData.hasVerification}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 flex items-center text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 mr-1" />
              账号已实名认证
            </label>
          </div>
        </div>
        {/* 账号绑定信息 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              手机号是否本人实名开户
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="radio" name="isPhoneRealName" value="true" checked={formData.isPhoneRealName === true} onChange={() => setFormData(prev => ({ ...prev, isPhoneRealName: true }))} className="mr-2" />是
              </label>
              <label className="flex items-center">
                <input type="radio" name="isPhoneRealName" value="false" checked={formData.isPhoneRealName === false} onChange={() => setFormData(prev => ({ ...prev, isPhoneRealName: false }))} className="mr-2" />否
              </label>
            </div>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              手机号是否还在使用
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="radio" name="isPhoneActive" value="true" checked={formData.isPhoneActive === true} onChange={() => setFormData(prev => ({ ...prev, isPhoneActive: true }))} className="mr-2" />是
              </label>
              <label className="flex items-center">
                <input type="radio" name="isPhoneActive" value="false" checked={formData.isPhoneActive === false} onChange={() => setFormData(prev => ({ ...prev, isPhoneActive: false }))} className="mr-2" />否
              </label>
            </div>
          </div>
        </div>
        {/* 投放/充值金额 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              投放/充值金额
            </label>
            <select
              name="rechargeAmount"
              value={formData.rechargeAmount || '0'}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            >
              <option value="0">0</option>
              <option value="1000以下">1000元以下</option>
              <option value="1000以上">1000元以上</option>
            </select>
          </div>
        </div>
        {/* 账号当前状态 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              当前账号状态
            </label>
            <select
              name="accountStatus"
              value={formData.accountStatus}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            >
              <option value="禁言">禁言</option>
              <option value="限流">限流</option>
              <option value="无法登陆">无法登陆</option>
              <option value="封禁">封禁</option>
            </select>
          </div>
        </div>
        {/* 封禁相关信息 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 mr-2" />
              封禁时长
            </label>
            <select
              name="banDuration"
              value={formData.banDuration}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            >
              <option value="">请选择封禁时长</option>
              <option value="1天">1天</option>
              <option value="3天">3天</option>
              <option value="7天">7天</option>
              <option value="30天">30天</option>
              <option value="180天">180天</option>
              <option value="永久封禁">永久封禁</option>
            </select>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <AlertTriangle className="w-4 h-4 mr-2" />
              封禁原因
            </label>
            <select
              name="banReason"
              value={formData.banReason}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            >
              <option value="">请选择封禁原因</option>
              <option value="作品内容违规">作品内容违规</option>
              <option value="私信评论违规">私信评论违规</option>
              <option value="直播违规">直播违规</option>
              <option value="直播连带违规">直播连带违规</option>
              <option value="刷粉刷赞">刷粉刷赞</option>
              <option value="恶意营销">恶意营销</option>
              <option value="脚本违规">脚本违规</option>
              <option value="侵权投诉">侵权投诉</option>
              <option value="其他违规">其他违规</option>
            </select>
          </div>
        </div>
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 mr-2" />
            系统提示的封禁理由描述
          </label>
          <textarea
            name="violationContent"
            value={formData.violationContent}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="请填写系统提示的封禁理由或详细情况"
            required
          />
        </div>
        {/* 历史情况 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <AlertTriangle className="w-4 h-4 mr-2" />
              历史申诉次数
            </label>
            <input
              type="number"
              name="previousAppeals"
              value={formData.previousAppeals}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="0"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              AI智能分析中...
            </span>
          ) : (
            '一键智能评估'
          )}
        </button>
      </form>
    </div>
  );
};

export default AccountForm;