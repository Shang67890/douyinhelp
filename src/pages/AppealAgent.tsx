import React, { useMemo } from 'react';
// 去除图标时间线实现，改为单列直线时间线

const AppealAgent: React.FC = () => {
  const steps = useMemo(
    () => [
      { title: '账号初步测评', desc: '免费或1元，快速判断问题与方向' },
      { title: '专家团队评估成功率', desc: '是否建议代办，给出可行性建议' },
      { title: '报价与服务', desc: '透明报价，绝不乱收，流程可追踪' },
      { title: '材料收集 + 个性化文案', desc: '围绕账号情况定制高质量申诉文案' },
      { title: '多通道联合申诉', desc: '抖音站内 / 邮箱 / 网信办 / 黑猫 / 12315' },
      { title: '后续跟进、复查与反馈', desc: '持续跟踪审核节点并及时优化策略' }
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
      <header className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 py-10 px-4 shadow-lg">
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(800px 200px at 50% -50%, rgba(99,102,241,.6), transparent 60%)' }} />
        <div className="max-w-5xl mx-auto relative">
          <h1 className="text-2xl md:text-3xl font-bold text-glow">📨 申诉代办服务 ｜ 为你定制高成功率的账号恢复路径</h1>
          <p className="mt-2 text-indigo-100 text-sm">专业评估 + 高质量申诉 + 多通道联动，透明可追溯。</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* 服务流程 - 单列竖向直线时间线（白色卡片） */}
        <section className="relative rounded-2xl p-8 bg-white text-gray-800 shadow-xl">
          <h2 className="text-xl font-semibold mb-8">服务流程</h2>

          <div className="relative pl-10">
            {/* 竖向主线 */}
            <span className="absolute left-4 top-0 h-full w-[3px] rounded bg-gradient-to-b from-indigo-400 via-purple-400 to-indigo-400" />

            <ul className="space-y-8">
              {steps.map((s, idx) => (
                <li key={idx} className="relative">
                  {/* 节点小圆点 */}
                  <span className="absolute left-[13px] top-2 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-white" />

                  {/* 编号 + 文案 */}
                  <div className="ml-12">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-200 text-sm font-semibold">
                        {idx + 1}
                      </span>
                      <span className="text-base font-semibold">{s.title}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 ml-12">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* 服务承诺 */}
          <div className="mt-10 pt-6 border-t border-gray-100 text-sm text-gray-600">
            我们不做承诺式解封，只做【专业评估 + 高质量申诉】，每一步都有标准化 SOP 和过往案例支持。
          </div>
        </section>

        {/* 价格分档 */}
        <section className="text-gray-800 grid md:grid-cols-3 gap-4">
          {[
            { title: '🟢 普通封禁申诉 不着急恢复', desc1: '账号不是主力号 / 无收益 / 误判 / 首次违规', desc2: '专属申诉话术 + 申诉建议 + 站内站外提交指导', price: '¥999', color: 'from-emerald-400 to-green-500', text: 'text-green-700' },
            { title: '🟡 重要账号代办 希望尽快解封', desc1: '主播号 / 达人号 / 有收益 / 有粉丝 / 已申诉失败', desc2: '1v1定制申诉文案 + 多通道辅助申诉 + 案件跟进', price: '¥2,499', color: 'from-amber-400 to-yellow-500', text: 'text-yellow-700' },
            { title: '🔴 疑难账号定制申诉 想尽一切办法恢复', desc1: '被误判为诈骗/色情/灰产 / 已多次失败 / 多号连带', desc2: '高级定制方案 + 证据构建 + 外部联合投诉申诉 + 组合拳', price: '¥4,999', color: 'from-rose-400 to-red-500', text: 'text-red-700' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-xl p-5 hover:shadow-2xl transition">
              <h3 className={`font-semibold mb-2 ${item.text}`}>{item.title}</h3>
              <p className="text-gray-600 mb-2">{item.desc1}</p>
              <p className="mb-4">{item.desc2}</p>
              <div className={`inline-block px-3 py-1 rounded-full text-white bg-gradient-to-r ${item.color}`}>{item.price}</div>
            </div>
          ))}
        </section>

        {/* 服务保障承诺 */}
        <section className="bg-white text-gray-800 rounded-xl shadow-xl p-6 space-y-3 text-sm leading-6">
          <h2 className="text-xl font-semibold mb-2">服务保障承诺</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>✅ 先评估，能做才接：不建议申诉的账号，绝不强推付费。</li>
            <li>🧠 专人负责，全流程透明：1对1服务，所有话术、材料、步骤可追溯。</li>
            <li>📄 申诉材料定制，不套模板：量身定制，避免“套话、流水线失败”。</li>
            <li>🔁 失败可复审，多轮支持：继续优化并复申，支持外部平台同步投诉。</li>
            <li>🚫 高风险账号提前告知：评估阶段明确不建议处理的情况。</li>
          </ul>
          <p className="text-xs text-gray-500">❗申诉结果最终由平台审核决定；服务开始后因涉及人工撰写与渠道执行，不支持中途退款，请在下单前确认好账号信息及申诉需求。</p>
        </section>

        {/* 底部CTA */}
        <section className="text-center space-y-3">
          <a href="/" className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow hover:from-indigo-700 hover:to-purple-700">🔍 想知道你是否适合代办？→ 马上进行申诉测评</a>
          <div>
            <button onClick={() => alert('请添加微信：Azxc0188')} className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg shadow hover:from-emerald-600 hover:to-teal-700">
              📨 直接联系代办顾问（微信 Azxc0188）
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AppealAgent;
