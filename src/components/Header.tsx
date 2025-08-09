import type { FC } from 'react';
import { Shield, Zap } from 'lucide-react';

const Header: FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white py-6 px-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <Shield className="w-8 h-8" />
          <h1 className="text-2xl md:text-3xl font-bold text-glow">抖音账号恢复成功率智能测评</h1>
          <Zap className="w-8 h-8" />
        </div>
        <p className="text-center text-white/90 text-sm md:text-base leading-relaxed">
          AI智能分析 • 专业评估 • 精准预测解封成功率
        </p>
        <nav className="mt-4 flex justify-center space-x-6 text-sm">
          <a href="/" className="text-indigo-100 hover:text-white link-underline">首页</a>
          <a href="#faq" className="text-indigo-100 hover:text-white link-underline">常见问题 FAQ</a>
          <a href="/appeal-agent" className="text-indigo-100 hover:text-white link-underline">📨 申诉代办服务</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;