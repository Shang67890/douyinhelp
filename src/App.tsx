import { useState } from 'react';
import Header from './components/Header';
import FAQ from './components/FAQ';
import AccountForm from './components/AccountForm';
import ResultPage from './components/ResultPage';
import { AccountInfo, AssessmentResult } from './types';
import { assessAccount } from './services/api';

function App() {
  const [currentPage, setCurrentPage] = useState<'form' | 'result'>('form');
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastAccountInfo, setLastAccountInfo] = useState<AccountInfo | null>(null);

  const handleFormSubmit = async (accountInfo: AccountInfo) => {
    setIsLoading(true);
    try {
      setLastAccountInfo(accountInfo);
      const result = await assessAccount(accountInfo);
      setAssessmentResult(result);
      setCurrentPage('result');
    } catch (error) {
      console.error('评估失败:', error);
      alert('评估过程中出现错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentPage('form');
    setAssessmentResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'form' ? (
          <AccountForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        ) : (
          assessmentResult && (
            <ResultPage result={assessmentResult} onReset={handleReset} accountInfo={lastAccountInfo!} />
          )
        )}
        <FAQ />
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold mb-2">抖音账号解封智能测评工具</h3>
          <p className="text-gray-400 mb-4">专业 • 智能 • 高效</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>客服微信：Azxc0188</span>
            <span>工作时间：9:00-21:00</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
            <p className="mb-2">免责声明：本工具基于用户填写信息与算法模型生成评估，结果仅供参考，不构成官方承诺或法律意见；请遵守平台规则，提交材料请注意隐私脱敏。</p>
            <p>© 2025 抖音解封助手</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;