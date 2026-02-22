'use client';

const AGENTS = [
  {
    emoji: '🤖',
    name: 'Jarbas',
    role: 'Assistente Geral / Estratégia',
    project: 'Todos',
    status: 'online' as const,
    allocation: 90,
    tools: ['OpenClaw', 'WhatsApp', 'Memory', 'Browser'],
    desc: 'Assistente principal do Arthur. Estratégia, planejamento e execução geral.',
  },
  {
    emoji: '🏥',
    name: 'CliniAgent',
    role: 'Comercial CliniSales',
    project: 'CliniSales',
    status: 'busy' as const,
    allocation: 70,
    tools: ['CRM', 'WhatsApp API', 'Leads'],
    desc: 'Responsável pelo processo comercial da CliniSales. SDR + CRM + Follow-up.',
  },
  {
    emoji: '🎓',
    name: 'MentorBot',
    role: 'Onboarding Negócio Simples',
    project: 'Negócio Simples',
    status: 'online' as const,
    allocation: 60,
    tools: ['Claude API', 'Foundation OS', 'Discord'],
    desc: 'Guia mentorados no Foundation OS. Responde dúvidas, valida etapas.',
  },
  {
    emoji: '⚡',
    name: 'DeliveryAgent',
    role: 'Entregas PowerHouse',
    project: 'PowerHouse',
    status: 'offline' as const,
    allocation: 20,
    tools: ['Builder', 'Templates', 'Vercel'],
    desc: 'Executa entregas sob demanda (landing pages, copy, etc). Em construção.',
  },
];

const STATUS_CONFIG = {
  online: { label: '● Online', color: 'text-green-400', bg: 'bg-green-400/10' },
  busy: { label: '● Ocupado', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  offline: { label: '○ Offline', color: 'text-gray-500', bg: 'bg-gray-500/10' },
};

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-brandos-primary text-glow">
          🤖 Agentes
        </h1>
        <p className="text-brandos-text-secondary text-sm mt-0.5">
          {AGENTS.filter(a => a.status === 'online').length} online ·{' '}
          {AGENTS.filter(a => a.status === 'busy').length} ocupados ·{' '}
          {AGENTS.filter(a => a.status === 'offline').length} offline
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AGENTS.map(agent => {
          const st = STATUS_CONFIG[agent.status];
          return (
            <div key={agent.name} className={`card border-t-2 ${agent.status === 'online' ? 'border-green-500' : agent.status === 'busy' ? 'border-yellow-500' : 'border-gray-700'} space-y-3`}>
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{agent.emoji}</span>
                  <div>
                    <p className="font-bold text-brandos-text">{agent.name}</p>
                    <p className="text-xs text-brandos-text-secondary">{agent.role}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${st.color} ${st.bg}`}>
                  {st.label}
                </span>
              </div>

              <p className="text-sm text-brandos-text-secondary">{agent.desc}</p>

              {/* Allocation */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-brandos-text-secondary">Alocação</span>
                  <span className="text-xs font-bold text-brandos-primary">{agent.allocation}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${agent.allocation}%` }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                <span className="text-xs px-2 py-0.5 bg-brandos-primary/10 text-brandos-primary rounded">
                  📦 {agent.project}
                </span>
                {agent.tools.map(tool => (
                  <span key={tool} className="text-xs px-2 py-0.5 bg-brandos-border rounded text-brandos-text-secondary">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="card text-center py-6 border-dashed opacity-50">
        <p className="text-brandos-text-secondary text-sm">
          🔜 PowerHouse expandirá o catálogo de agentes especializados
        </p>
      </div>
    </div>
  );
}
