import React from 'react';
import { AssessmentResult, AccountInfo } from '../types';
import { 
  TrendingUp, 
  Download, 
  Phone, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle, 
  Target,
  Lightbulb,
  Star
} from 'lucide-react';

interface ResultPageProps {
  result: AssessmentResult;
  onReset: () => void;
  accountInfo: AccountInfo;
}

const ResultPage: React.FC<ResultPageProps> = ({ result, onReset, accountInfo }) => {
  const getSuccessRateColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSuccessRateBackground = (rate: number) => {
    if (rate >= 80) return 'from-green-500 to-green-600';
    if (rate >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const handleDownload = () => {
    // 模拟下载话术包
    const element = document.createElement('a');
    const file = new Blob([`
抖音账号申诉话术包

解封成功率: ${result.successRate}%

推荐申诉路径: ${result.recommendedPath}

详细分析:
${result.analysis}

申诉建议:
${result.suggestions.map((suggestion, index) => `${index + 1}. ${suggestion}`).join('\n')}

风险因素:
${result.riskFactors.map((factor, index) => `${index + 1}. ${factor}`).join('\n')}

用户填写摘要:
- 内容类型: ${accountInfo.contentType}
- 系统提示的封禁理由描述: ${accountInfo.violationContent}

申诉话术模板:
尊敬的抖音官方，我是用户[账号ID]，针对我的账号被封禁一事，我想进行申诉...
[详细话术内容请联系客服获取完整版本]
    `], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = '抖音申诉话术包.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // 联系服务跳转已改为静态路由按钮

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 成功率展示卡片 */}
      <div className="bg-white/95 backdrop-blur rounded-xl shadow-xl p-6 md:p-8 neon-shadow neon-shadow-hover hover-lift fade-in">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">AI智能评估结果</h2>
          <p className="text-gray-600">基于深度学习算法分析，为您提供专业的解封成功率预测</p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className={`relative w-32 h-32 rounded-full bg-gradient-to-r ${getSuccessRateBackground(result.successRate)} shadow-lg flex items-center justify-center mb-4`}>
            <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center">
              <span className={`text-3xl font-bold ${getSuccessRateColor(result.successRate)}`}>
                {result.successRate}%
              </span>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">解封成功率</h3>
          <div className="flex items-center space-x-2">
            <TrendingUp className={`w-5 h-5 ${getSuccessRateColor(result.successRate)}`} />
            <span className={`font-medium ${getSuccessRateColor(result.successRate)}`}>
              {result.successRate >= 80 ? '成功率较高' : result.successRate >= 60 ? '成功率中等' : '成功率较低'}
            </span>
          </div>
        </div>
      </div>

      {/* 详细分析 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/95 backdrop-blur rounded-xl shadow-xl p-6 hover-lift">
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">推荐申诉路径</h3>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-800 font-medium">{result.recommendedPath}</p>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur rounded-xl shadow-xl p-6 hover-lift">
          <div className="flex items-center mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">AI分析摘要</h3>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-yellow-800 text-sm leading-relaxed">{result.analysis}</p>
          </div>
        </div>
      </div>

      {/* 风险因素和建议 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/95 backdrop-blur rounded-xl shadow-xl p-6 hover-lift">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">风险因素</h3>
          </div>
          <ul className="space-y-2">
            {result.riskFactors.map((factor, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700 text-sm">{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/95 backdrop-blur rounded-xl shadow-xl p-6 hover-lift">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">申诉建议</h3>
          </div>
          <ul className="space-y-2">
            {result.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700 text-sm">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="bg-white/95 backdrop-blur rounded-xl shadow-xl p-6 hover-lift">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">选择您的下一步操作</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={handleDownload}
            className="flex flex-col items-center p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 btn-glow"
          >
            <Download className="w-8 h-8 mb-2" />
            <span className="font-semibold">下载话术包</span>
            <span className="text-sm opacity-90 mt-1">免费获取专业申诉话术</span>
          </button>

          <a
            href="/appeal-agent"
            className="flex flex-col items-center p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 text-center btn-glow"
          >
            <Phone className="w-8 h-8 mb-2" />
            <span className="font-semibold">申诉代办服务</span>
            <span className="text-sm opacity-90 mt-1">查看流程与价格，获取1对1协助</span>
          </a>

          <button
            onClick={onReset}
            className="flex flex-col items-center p-6 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white rounded-lg hover:from-fuchsia-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 btn-glow"
          >
            <RotateCcw className="w-8 h-8 mb-2" />
            <span className="font-semibold">重新评估</span>
            <span className="text-sm opacity-90 mt-1">返回首页填写新信息</span>
          </button>
        </div>
      </div>

      {/* 服务特色 */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 card-hover">
        <div className="text-center mb-4">
          <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-800">为什么选择我们？</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-1">AI智能分析</h4>
              <p className="text-sm text-gray-600">基于大数据和深度学习算法</p>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-1">专业团队</h4>
              <p className="text-sm text-gray-600">5年以上申诉经验专家</p>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-1">成功率保障</h4>
              <p className="text-sm text-gray-600">不成功不收费承诺</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;