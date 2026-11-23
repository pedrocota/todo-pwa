import { useEffect, useMemo, useState } from 'react';
import { Check, Circle, ListTodo, Plus, Sparkles, Trash2, Wifi, WifiOff } from 'lucide-react';

const STORAGE_KEY = 'leve-todo-tasks-v1';
const FILTERS = [
  { id: 'all', label: 'Tarefas', icon: ListTodo },
  { id: 'open', label: 'Não concluídas', icon: Circle },
  { id: 'done', label: 'Concluídas', icon: Check },
];

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');
  const [isOnline, setIsOnline] = useState(() => typeof navigator === 'undefined' ? true : navigator.onLine);

  useEffect(() => {
    const updateConnection = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateConnection);
    window.addEventListener('offline', updateConnection);
    updateConnection();
    return () => { window.removeEventListener('online', updateConnection); window.removeEventListener('offline', updateConnection); };
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch (error) {
      console.error('Não foi possível salvar as tarefas no navegador.', error);
    }
  }, [tasks]);

  const completed = tasks.filter(task => task.completed).length;
  const pending = tasks.length - completed;
  const visibleTasks = useMemo(() => tasks.filter(task => {
    if (filter === 'open') return !task.completed;
    if (filter === 'done') return task.completed;
    return true;
  }), [tasks, filter]);

  function addTask(event) {
    event.preventDefault();
    const title = text.trim();
    if (!title) return;
    setTasks(current => [{ id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`, title, completed: false, createdAt: Date.now() }, ...current]);
    setText('');
    setFilter('all');
  }

  function toggleTask(id) {
    setTasks(current => current.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  }

  function removeTask(id) {
    setTasks(current => current.filter(task => task.id !== id));
  }

  const summary = filter === 'all'
    ? `${completed} ${completed === 1 ? 'tarefa concluída' : 'tarefas concluídas'} e ${pending} ${pending === 1 ? 'tarefa não concluída' : 'tarefas não concluídas'}`
    : filter === 'open'
      ? `${pending} ${pending === 1 ? 'tarefa não concluída' : 'tarefas não concluídas'}`
      : `${completed} ${completed === 1 ? 'tarefa concluída' : 'tarefas concluídas'}`;

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="content">
        <header className="topbar">
          <a className="brand" href="#inicio" aria-label="Leve, início"><span className="brand-mark"><Check size={19} strokeWidth={3} /></span><span>leve<span className="brand-dot">.</span></span></a>
          <div className={`connection-pill ${isOnline ? 'online' : 'offline'}`} role="status" aria-live="polite">{isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}<span>{isOnline ? 'Online' : 'Offline'}</span></div>
        </header>

        <section className="hero" id="inicio">
          <div className="eyebrow"><Sparkles size={14} /> UM PASSO DE CADA VEZ</div>
          <h1>Organize o dia.<br /><span>Descomplique a vida.</span></h1>
          <p>Pequenas tarefas, grandes conquistas.</p>
        </section>

        <section className="task-panel" aria-label="Gerenciador de tarefas">
          <form className="add-form" onSubmit={addTask}>
            <label className="sr-only" htmlFor="new-task">Nova tarefa</label>
            <input id="new-task" value={text} onChange={event => setText(event.target.value)} placeholder="O que você precisa fazer?" maxLength={180} />
            <button className="add-button" type="submit" aria-label="Adicionar tarefa" disabled={!text.trim()}><Plus size={21} strokeWidth={2.5} /><span>Adicionar</span></button>
          </form>

          <div className="list-heading">
            <div><h2>{filter === 'all' ? 'Sua lista' : filter === 'open' ? 'Em andamento' : 'Feitas com sucesso'}</h2><p>{summary}</p></div>
            <span className="count-badge">{visibleTasks.length.toString().padStart(2, '0')}</span>
          </div>

          {visibleTasks.length > 0 ? (
            <ul className="task-list">
              {visibleTasks.map((task, index) => (
                <li className={`task-item ${task.completed ? 'is-complete' : ''}`} key={task.id} style={{ '--item-index': index }}>
                  <button className="check-button" type="button" onClick={() => toggleTask(task.id)} aria-label={task.completed ? `Desmarcar ${task.title}` : `Concluir ${task.title}`} aria-pressed={task.completed}>
                    {task.completed && <Check size={16} strokeWidth={3} />}
                  </button>
                  <span className="task-title">{task.title}</span>
                  <button className="delete-button" type="button" onClick={() => removeTask(task.id)} aria-label={`Excluir ${task.title}`} title="Excluir tarefa"><Trash2 size={17} /></button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <div className="empty-illustration"><ListTodo size={28} strokeWidth={1.5} /></div>
              <strong>{filter === 'done' ? 'Suas conquistas aparecem aqui' : filter === 'open' ? 'Tudo em dia por aqui!' : 'Vamos começar com uma tarefa?'}</strong>
              <span>{filter === 'done' ? 'Marque uma tarefa quando terminar.' : filter === 'open' ? 'Você concluiu tudo. Aproveite o momento!' : 'Adicione sua primeira tarefa logo acima.'}</span>
            </div>
          )}
          <div className="panel-footer"><span className="status-dot" /> Seus dados ficam salvos neste dispositivo, mesmo offline</div>
        </section>

        <footer className="page-footer">Feito para deixar a rotina mais leve <span>✳</span></footer>
      </div>

      <nav className="floating-nav" aria-label="Filtrar tarefas">
        {FILTERS.map(({ id, label, icon: Icon }) => (
          <button key={id} className={`nav-item ${filter === id ? 'active' : ''}`} onClick={() => setFilter(id)} aria-current={filter === id ? 'page' : undefined}>
            <span className="nav-icon"><Icon size={19} strokeWidth={filter === id ? 2.5 : 2} /></span>
            <span className="nav-label">{label}</span>
            {id === 'open' && pending > 0 && <span className="nav-count">{pending}</span>}
            {id === 'done' && completed > 0 && <span className="nav-count">{completed}</span>}
          </button>
        ))}
      </nav>
    </main>
  );
}
