import { getLastCommit } from '@/lib/github';

const PROJECTS = [
  {
    id: 'negocio_simples',
    name: 'Negócio Simples',
    emoji: '🎓',
    description: 'Agente Foundation Specialist — Chat IA para mentorados',
    borderColor: 'border-green-500',
    vercel: 'https://negocio-simples.vercel.app',
    progress: 85,
    tags: ['Next.js 14', 'Claude API', 'TypeScript'],
    pendingTasks: [
      'Integrar com BrandOS Command Center',
      'Customizar prompt Foundation Specialist',
      'Adicionar analytics de uso',
    ],
  },
  {
    id: 'zero-churn',
    name: 'Zero Churn',
    emoji: '🔒',
    description: 'SaaS de gestão de clientes com IA preditiva de churn',
    borderColor: 'border-blue-500',
    vercel: 'https://zerochurn.brandosystem.com',
    progress: 95,
    tags: ['Next.js 15', 'Supabase', 'WhatsApp API', 'GPT-4o'],
    pendingTasks: [
      'Aplicar migration 015 no Supabase',
      'Validar bug fix no_payment_data',
      'Seletor de grupo WhatsApp',
      'Testar com 20 clientes reais',
    ],
  },
  {
    id: 'brandos-command-center',
    name: 'BrandOS Command Center',
    emoji: '🟢',
    description: 'Dashboard visual + gestão de projetos e tasks',
    borderColor: 'border-yellow-500',
    vercel: 'https://brandos-command-center.vercel.app',
    progress: 40,
    tags: ['Next.js 14', 'Supabase', 'Tailwind'],
    pendingTasks: [
      'Auth GitHub OAuth',
      'API routes CRUD (tasks, projects)',
      'Integrar zero-churn como módulo',
      'Configurar domínio customizado',
    ],
  },
];

async function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const lastCommit = await getLastCommit(project.id);
  const commitMsg = lastCommit?.commit?.message?.split('\n')[0] || 'Sem commits';
  const commitDate = lastCommit?.commit?.author?.date
    ? new Date(lastCommit.commit.author.date).toLocaleDateString('pt-BR')
    : '—';

  return (
    <div className={`card border-2 ${project.borderColor} flex flex-col gap-4`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{project.emoji}</span>
            <h3 className="font-bold text-lg text-brandos-text">{project.name}</h3>
          </div>
          <p className="text-sm text-brandos-text-secondary">{project.description}</p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 whitespace-nowrap ml-2">
          ● Ativo
        </span>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-xs text-brandos-text-secondary">Progresso</span>
          <span className="text-sm font-bold text-brandos-primary">{project.progress}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${project.progress}%` }} />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {project.tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-0.5 bg-brandos-border rounded text-brandos-text-secondary">
            {tag}
          </span>
        ))}
      </div>

      {/* Last Commit */}
      <div className="bg-brandos-bg rounded p-3 text-xs">
        <p className="text-brandos-text-secondary mb-1">📦 Último commit — {commitDate}</p>
        <p className="text-brandos-text truncate font-mono">{commitMsg}</p>
      </div>

      {/* Pending */}
      <div>
        <p className="text-xs font-semibold text-brandos-text-secondary mb-2">
          ⏳ Pendente ({project.pendingTasks.length})
        </p>
        <ul className="space-y-1">
          {project.pendingTasks.map((task, i) => (
            <li key={i} className="text-xs text-brandos-text flex items-start gap-1.5">
              <span className="text-yellow-400 mt-0.5 flex-shrink-0">›</span>
              {task}
            </li>
          ))}
        </ul>
      </div>

      {/* Links */}
      <div className="flex gap-2 mt-auto pt-2">
        <a
          href={`https://github.com/arthurfbrandos-opb/${project.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-xs py-1.5 px-3 rounded flex-1 text-center no-underline"
        >
          GitHub →
        </a>
        <a
          href={project.vercel}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-xs py-1.5 px-3 rounded flex-1 text-center no-underline"
        >
          Ver Site →
        </a>
      </div>
    </div>
  );
}

export default async function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-brandos-primary text-glow">
          📦 Projetos BrandOS
        </h1>
        <p className="text-brandos-text-secondary text-sm mt-1">
          {PROJECTS.length} projetos ativos · commits em tempo real do GitHub
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {PROJECTS.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
