import React, { useState, useEffect, useMemo } from 'react';
import {
  Code,
  Layers,
  Activity,
  Terminal,
  Play,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Cpu,
  Boxes,
  Eye,
  Sliders,
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  ChevronRight,
  ChevronDown,
  Layout,
  ExternalLink,
  Search,
  BookOpen,
  ArrowRight,
  RefreshCw,
  Plus,
  Trash2,
  Maximize2
} from 'lucide-react';

// Types
interface ProtocolLog {
  id: string;
  timestamp: string;
  direction: 'client_to_server' | 'server_to_client';
  type: string;
  data: Record<string, any>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'playground' | 'demos' | 'protocol' | 'templates' | 'docs'>('playground');
  const [copied, setCopied] = useState(false);

  // Playground state simulation (PyLage State imitation in React)
  const [counterState, setCounterState] = useState(0);
  const [textInputState, setTextInputState] = useState('Hello PyLage!');
  const [switchState, setSwitchState] = useState(true);
  const [sliderState, setSliderState] = useState(65);
  const [selectState, setSelectState] = useState('active');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('Event dispatched successfully!');
  const [accordionOpen, setAccordionOpen] = useState<string>('sec1');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [progressState, setProgressState] = useState(45);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Active selected component in playground
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // WebSocket / Protocol Logger
  const [logs, setLogs] = useState<ProtocolLog[]>([
    {
      id: 'log-init-1',
      timestamp: new Date().toLocaleTimeString(),
      direction: 'server_to_client',
      type: 'handshake',
      data: { status: 'connected', version: '0.1.0', protocol: 'pylage_ws_v1' }
    },
    {
      id: 'log-init-2',
      timestamp: new Date().toLocaleTimeString(),
      direction: 'server_to_client',
      type: 'tree_render',
      data: { root_id: 'app-root-01', nodes_count: 24 }
    }
  ]);

  const addLog = (direction: 'client_to_server' | 'server_to_client', type: string, data: Record<string, any>) => {
    const newLog: ProtocolLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString(),
      direction,
      type,
      data
    };
    setLogs(prev => [newLog, ...prev.slice(0, 30)]);
  };

  // Helper to trigger simulated PyLage state update
  const triggerStateSet = (name: string, newVal: any, componentId: string) => {
    addLog('client_to_server', 'event', {
      type: 'event',
      component_id: componentId,
      event: 'click_or_input',
      payload: { value: newVal }
    });

    setTimeout(() => {
      addLog('server_to_client', 'update', {
        type: 'update',
        id: componentId,
        prop_meta: { kind: 'text_or_attribute', html_name: name },
        props: { [name]: newVal }
      });
    }, 40);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generated Python code preview for playground
  const pythonCode = useMemo(() => {
    return `# Generated reactive PyLage UI Script
import pylage as pl
from pylage import Style, State
from pylage_layout.layouts import Container, AppShell, TwoColumn

# 1. Initialize Reactive States
counter = State(${counterState})
input_text = State("${textInputState}")
is_active = State(${switchState ? 'True' : 'False'})
progress = State(${progressState})

# 2. Define Event Callbacks
def handle_increment():
    counter.set(counter.value + 1)

def handle_text_change(payload):
    input_text.set(payload.get("value", ""))

def handle_toggle():
    is_active.set(not is_active.value)

# 3. Compose Component Tree
app = pl.Column(
    pl.Heading("⚡ PyLage Reactive Studio", level=1),
    pl.Text("Live WebSocket-synced Python UI without frontend JS."),
    
    pl.Card(
        pl.Heading(counter, level=2),  # Bound directly to State
        pl.Row(
            pl.Button("Increment Counter", on_click=handle_increment),
            pl.Button("Reset", on_click=lambda: counter.set(0)),
            style=Style(gap="0.75rem")
        )
    ),
    
    pl.Card(
        pl.Input(value=input_text, on_input=handle_text_change),
        pl.Text(input_text, style=Style(color="#4f46e5", font_weight="600")),
        pl.ProgressBar(value=progress, max=100)
    ),
    
    style=Style(padding="2rem", gap="1.5rem", max_width="960px")
)

# 4. Run WebSocket Reactive Server
if __name__ == "__main__":
    pl.run(app, title="PyLage App", serve=True, port=8080)
`;
  }, [counterState, textInputState, switchState, progressState]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-indigo-500/20">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">PyLage UI</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/30">
                v0.1.0 • Ready
              </span>
            </div>
            <p className="text-xs text-slate-400">Pure Python Reactive UI Framework & Layout Engine</p>
          </div>
        </div>

        {/* Tab Selector */}
        <nav className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          <button
            id="tab-btn-playground"
            onClick={() => setActiveTab('playground')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'playground'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Boxes className="w-3.5 h-3.5" />
            <span>Playground</span>
          </button>
          <button
            id="tab-btn-demos"
            onClick={() => setActiveTab('demos')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'demos'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Interactive Apps</span>
          </button>
          <button
            id="tab-btn-templates"
            onClick={() => setActiveTab('templates')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'templates'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>pylage_layout</span>
          </button>
          <button
            id="tab-btn-protocol"
            onClick={() => setActiveTab('protocol')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'protocol'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>WS Protocol Stream</span>
          </button>
          <button
            id="tab-btn-docs"
            onClick={() => setActiveTab('docs')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'docs'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Specs & Audit</span>
          </button>
        </nav>

        {/* Live WS Status Badge */}
        <div className="hidden md:flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full text-xs text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>WebSocket Sync: Active</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 flex flex-col gap-6">
        
        {/* ==================== TAB 1: PLAYGROUND ==================== */}
        {activeTab === 'playground' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
            {/* Left Col: Interactive Live Render Window */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                    <span className="text-xs font-mono text-slate-400 ml-2">PyLage Live Virtual DOM [Browser View]</span>
                  </div>
                  <button
                    id="btn-reset-states"
                    onClick={() => {
                      setCounterState(0);
                      setTextInputState('Hello PyLage!');
                      setProgressState(45);
                      setSwitchState(true);
                      addLog('client_to_server', 'reset', { type: 'state_reset' });
                    }}
                    className="text-xs text-slate-400 hover:text-indigo-400 flex items-center gap-1 transition"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset States
                  </button>
                </div>

                {/* Section 1: Reactive State & Counter */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-700/50 text-[11px] font-mono text-indigo-300">
                        ps.State(int)
                      </span>
                      <h4 className="text-sm font-semibold text-slate-200">Reactive Heading & Buttons</h4>
                    </div>
                    <span className="text-xs font-mono text-indigo-400">id="counter-node"</span>
                  </div>

                  <div className="bg-slate-900/90 rounded-lg p-4 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Bound Heading Component Value:</div>
                      <div className="text-3xl font-extrabold text-white mt-1 font-mono">{counterState}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        id="btn-count-inc"
                        onClick={() => {
                          const next = counterState + 1;
                          setCounterState(next);
                          triggerStateSet('value', next, 'heading_count_01');
                        }}
                        className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-lg text-xs font-semibold shadow transition"
                      >
                        + Increment
                      </button>
                      <button
                        id="btn-count-dec"
                        onClick={() => {
                          const next = counterState - 1;
                          setCounterState(next);
                          triggerStateSet('value', next, 'heading_count_01');
                        }}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition"
                      >
                        - Decrement
                      </button>
                      <button
                        id="btn-count-add10"
                        onClick={() => {
                          const next = counterState + 10;
                          setCounterState(next);
                          triggerStateSet('value', next, 'heading_count_01');
                        }}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition"
                      >
                        +10 Batch
                      </button>
                    </div>
                  </div>
                </div>

                {/* Section 2: Two-way Input Binding & Progress */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700/50 text-[11px] font-mono text-emerald-300">
                        ps.Input(on_input)
                      </span>
                      <h4 className="text-sm font-semibold text-slate-200">Two-Way State Binding</h4>
                    </div>
                    <span className="text-xs font-mono text-emerald-400">id="input-text-node"</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Interactive Input (dispatches on_input keystrokes):</label>
                      <input
                        id="input-text-reactive"
                        type="text"
                        value={textInputState}
                        onChange={(e) => {
                          setTextInputState(e.target.value);
                          triggerStateSet('value', e.target.value, 'input_text_01');
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition font-mono"
                        placeholder="Type to trigger live WebSocket sync..."
                      />
                    </div>

                    <div className="p-3 bg-slate-900/70 rounded-lg border border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Bound Text Component:</span>
                      <span className="font-semibold text-indigo-300 font-mono">"{textInputState}"</span>
                    </div>

                    {/* Progress Bar Component */}
                    <div className="flex flex-col gap-1.5 mt-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">ProgressBar (Reactive Value):</span>
                        <span className="font-mono text-indigo-400 font-semibold">{progressState}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full rounded-full transition-all duration-300"
                          style={{ width: `${progressState}%` }}
                        ></div>
                      </div>
                      <div className="flex gap-2 mt-1">
                        <button
                          id="btn-progress-boost"
                          onClick={() => {
                            const next = Math.min(100, progressState + 15);
                            setProgressState(next);
                            triggerStateSet('value', next, 'progress_node_01');
                          }}
                          className="text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 text-slate-300 transition"
                        >
                          +15% Progress
                        </button>
                        <button
                          id="btn-progress-reset"
                          onClick={() => {
                            setProgressState(0);
                            triggerStateSet('value', 0, 'progress_node_01');
                          }}
                          className="text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 text-slate-300 transition"
                        >
                          Reset to 0%
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Switch, Select & Feedback Components */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col gap-3">
                  <h4 className="text-sm font-semibold text-slate-200">Form Controls & Interactive Feedback</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Switch */}
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col justify-between gap-2">
                      <div className="text-xs text-slate-400">Switch Component</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-300">{switchState ? 'Enabled' : 'Disabled'}</span>
                        <button
                          id="btn-switch-toggle"
                          onClick={() => {
                            const next = !switchState;
                            setSwitchState(next);
                            triggerStateSet('checked', next, 'switch_01');
                          }}
                          className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                            switchState ? 'bg-indigo-600 justify-end' : 'bg-slate-700 justify-start'
                          }`}
                        >
                          <span className="bg-white w-4 h-4 rounded-full shadow-md"></span>
                        </button>
                      </div>
                    </div>

                    {/* Select */}
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col justify-between gap-2">
                      <div className="text-xs text-slate-400">Select Component</div>
                      <select
                        id="select-role-state"
                        value={selectState}
                        onChange={(e) => {
                          setSelectState(e.target.value);
                          triggerStateSet('value', e.target.value, 'select_01');
                        }}
                        className="bg-slate-800 border border-slate-700 text-xs rounded px-2 py-1 text-slate-200 focus:outline-none"
                      >
                        <option value="active">Active Admin</option>
                        <option value="editor">Editor</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    </div>

                    {/* Toast Notification Trigger */}
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col justify-between gap-2">
                      <div className="text-xs text-slate-400">Toast & Alert</div>
                      <button
                        id="btn-toast-trigger"
                        onClick={() => {
                          setToastVisible(true);
                          triggerStateSet('visible', true, 'toast_node_01');
                          setTimeout(() => setToastVisible(false), 3500);
                        }}
                        className="px-2.5 py-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-xs font-medium rounded text-white transition flex items-center justify-center gap-1"
                      >
                        <Bell className="w-3 h-3" /> Show Toast
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Toast Preview */}
                  {toastVisible && (
                    <div className="bg-indigo-950/90 border border-indigo-500/50 text-indigo-200 text-xs px-4 py-3 rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span><strong>PyLage Notification:</strong> {toastMessage}</span>
                      </div>
                      <button onClick={() => setToastVisible(false)} className="text-slate-400 hover:text-white">✕</button>
                    </div>
                  )}
                </div>

                {/* Section 4: Accordion & Tabs Demo */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col gap-3">
                  <h4 className="text-sm font-semibold text-slate-200">Accordion & Structured Trees</h4>
                  <div className="border border-slate-800 rounded-lg overflow-hidden divide-y divide-slate-800 text-xs">
                    <div className="bg-slate-900">
                      <button
                        id="accordion-header-sec1"
                        onClick={() => setAccordionOpen(accordionOpen === 'sec1' ? '' : 'sec1')}
                        className="w-full px-4 py-2.5 flex items-center justify-between text-left font-medium text-slate-200 hover:bg-slate-800/60"
                      >
                        <span>⚡ Structural Tree Diffing Protocol</span>
                        {accordionOpen === 'sec1' ? <ChevronDown className="w-4 h-4 text-indigo-400" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                      </button>
                      {accordionOpen === 'sec1' && (
                        <div className="p-4 bg-slate-950/80 text-slate-300 leading-relaxed border-t border-slate-800">
                          PyLage computes minimal <code className="text-amber-300">tree_add</code>, <code className="text-amber-300">tree_replace</code>, and <code className="text-amber-300">update</code> operations and ships only what changed over WebSockets.
                        </div>
                      )}
                    </div>
                    <div className="bg-slate-900">
                      <button
                        id="accordion-header-sec2"
                        onClick={() => setAccordionOpen(accordionOpen === 'sec2' ? '' : 'sec2')}
                        className="w-full px-4 py-2.5 flex items-center justify-between text-left font-medium text-slate-200 hover:bg-slate-800/60"
                      >
                        <span>🎨 Typed, Frozen Style Schema</span>
                        {accordionOpen === 'sec2' ? <ChevronDown className="w-4 h-4 text-indigo-400" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                      </button>
                      {accordionOpen === 'sec2' && (
                        <div className="p-4 bg-slate-950/80 text-slate-300 leading-relaxed border-t border-slate-800">
                          <code className="text-indigo-300">Style</code> is an immutable dataclass preventing silent CSS typos. Breakpoint styling is supported with <code className="text-indigo-300">ResponsiveStyle(base=..., md=..., lg=...)</code>.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Code Generator & Live Script Viewer */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col flex-1">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-indigo-400" />
                    <h3 className="font-semibold text-sm text-slate-200">Corresponding Python Code</h3>
                  </div>
                  <button
                    id="btn-copy-pycode"
                    onClick={() => copyToClipboard(pythonCode)}
                    className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="relative flex-1 bg-slate-950 rounded-xl border border-slate-800/80 p-4 font-mono text-xs overflow-auto max-h-[560px] text-slate-300 leading-relaxed">
                  <pre>{pythonCode}</pre>
                </div>

                {/* Quick Info Badge */}
                <div className="mt-4 p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl flex items-start gap-2.5 text-xs text-indigo-200">
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Zero Frontend JavaScript required:</span> Changes to <code className="text-indigo-300 font-mono">State</code> automatically dispatch minimal diff patches over WebSockets.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: INTERACTIVE APPS ==================== */}
        {activeTab === 'demos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Demo 1: Table & Data Grid Demo */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 shadow-lg hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium border border-blue-500/30">
                  Data & Tables
                </span>
                <span className="text-xs text-slate-500 font-mono">app/table_manual.py</span>
              </div>
              <h3 className="font-bold text-slate-100 text-base">Reactive User Directory Table</h3>
              <p className="text-xs text-slate-400">
                Shows PyLage Table with sorting, badge statuses, and batch row addition via tree mutation.
              </p>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-1.5 px-2">ID</th>
                      <th className="py-1.5 px-2">Name</th>
                      <th className="py-1.5 px-2">Role</th>
                      <th className="py-1.5 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    <tr>
                      <td className="py-2 px-2 text-slate-400">#01</td>
                      <td className="py-2 px-2 text-slate-200 font-sans font-medium">Rahul Sharma</td>
                      <td className="py-2 px-2 text-indigo-400">Developer</td>
                      <td className="py-2 px-2">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">Active</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 text-slate-400">#02</td>
                      <td className="py-2 px-2 text-slate-200 font-sans font-medium">Priya Singh</td>
                      <td className="py-2 px-2 text-indigo-400">Designer</td>
                      <td className="py-2 px-2">
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px]">Pending</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 text-slate-400">#03</td>
                      <td className="py-2 px-2 text-slate-200 font-sans font-medium">Amit Kumar</td>
                      <td className="py-2 px-2 text-indigo-400">Architect</td>
                      <td className="py-2 px-2">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">Active</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Component: <code className="text-slate-300">pl.Table()</code></span>
                <span className="text-indigo-400 font-medium">Built-in</span>
              </div>
            </div>

            {/* Demo 2: Button System & Styles */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 shadow-lg hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium border border-indigo-500/30">
                  Styles & Variants
                </span>
                <span className="text-xs text-slate-500 font-mono">app/button_manual.py</span>
              </div>
              <h3 className="font-bold text-slate-100 text-base">Button Variant System</h3>
              <p className="text-xs text-slate-400">
                Primary, Outline, Danger, Pill, and Custom styled buttons with event dispatchers.
              </p>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-wrap gap-2 items-center">
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-500">
                  Primary
                </button>
                <button className="px-3 py-1.5 bg-slate-900 border border-blue-500 text-blue-400 rounded-lg text-xs font-semibold hover:bg-slate-800">
                  Outline
                </button>
                <button className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-500">
                  Danger
                </button>
                <button className="px-4 py-1.5 bg-amber-400 text-slate-950 font-bold rounded-full text-xs shadow">
                  Pill Glow
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Style: <code className="text-slate-300">pylage.Style()</code></span>
                <span className="text-indigo-400 font-medium">Frozen Dataclass</span>
              </div>
            </div>

            {/* Demo 3: Modern Card & Media Components */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 shadow-lg hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium border border-purple-500/30">
                  Layouts & Media
                </span>
                <span className="text-xs text-slate-500 font-mono">app/media_manual.py</span>
              </div>
              <h3 className="font-bold text-slate-100 text-base">Media & Feedback Primitives</h3>
              <p className="text-xs text-slate-400">
                Card containers, Avatars, Badges, Loaders, and Media embeds.
              </p>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                    RS
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Rachit Sharma</div>
                    <div className="text-[11px] text-slate-400">Framework Creator</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded text-[10px] font-mono">Avatar()</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-mono">Badge()</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-mono">Spinner()</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Components: <code className="text-slate-300">Card, Avatar, Badge</code></span>
                <span className="text-indigo-400 font-medium">Composables</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: PYLAGE_LAYOUT ==================== */}
        {activeTab === 'templates' && (
          <div className="flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Layout className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">pylage_layout Layouts & Templates Library</h3>
              </div>
              <p className="text-sm text-slate-400 max-w-3xl">
                Ready-to-use responsive primitives like <code className="text-indigo-300">AppShell</code>, <code className="text-indigo-300">TwoColumn</code>, <code className="text-indigo-300">SidebarLayout</code>, and full page templates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Template 1: AppShell Dashboard Architecture */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-slate-200">AppShell(header=..., sidebar=..., content=...)</h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/60 font-mono">Layout Primitive</span>
                </div>
                
                {/* Visual Wireframe Preview */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 h-48 flex flex-col gap-2">
                  <div className="h-7 bg-indigo-950/80 border border-indigo-600/40 rounded flex items-center px-3 text-[11px] font-mono text-indigo-300 justify-between">
                    <span>Header (Navigation / Profile)</span>
                    <span className="text-[10px] text-slate-500">top-fixed</span>
                  </div>
                  <div className="flex-1 flex gap-2">
                    <div className="w-1/4 bg-slate-900 border border-slate-800 rounded p-2 text-[10px] font-mono text-slate-400 flex flex-col gap-1">
                      <span>Sidebar</span>
                      <div className="h-1.5 bg-slate-800 rounded w-3/4"></div>
                      <div className="h-1.5 bg-slate-800 rounded w-1/2"></div>
                      <div className="h-1.5 bg-slate-800 rounded w-2/3"></div>
                    </div>
                    <div className="flex-1 bg-slate-900/60 border border-slate-800 rounded p-3 flex flex-col gap-2">
                      <div className="h-4 bg-slate-800 rounded w-1/3"></div>
                      <div className="grid grid-cols-2 gap-2 flex-1">
                        <div className="bg-slate-950 border border-slate-800/80 rounded p-2 text-[10px] text-slate-400">Card 1</div>
                        <div className="bg-slate-950 border border-slate-800/80 rounded p-2 text-[10px] text-slate-400">Card 2</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs text-slate-300 border border-slate-800/80">
                  <pre>{`from pylage_layout.layouts import AppShell, TwoColumn, Container

app = AppShell(
    header=pl.Text("My Python Dashboard"),
    sidebar=pl.Column(pl.Text("Analytics"), pl.Text("Settings")),
    content=Container(main_dashboard_view),
)`}</pre>
                </div>
              </div>

              {/* Template 2: Hero & Stats Section */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-slate-200">Patterns: Hero & StatsSection</h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/60 font-mono">Marketing Pattern</span>
                </div>

                {/* Visual Wireframe Preview */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 h-48 flex flex-col justify-between">
                  <div className="text-center flex flex-col items-center gap-1">
                    <div className="h-4 bg-indigo-500/30 rounded w-1/2"></div>
                    <div className="h-2.5 bg-slate-800 rounded w-2/3 mt-1"></div>
                    <div className="flex gap-2 mt-2">
                      <div className="h-5 px-3 bg-indigo-600 rounded text-[10px] text-white flex items-center">Action</div>
                      <div className="h-5 px-3 bg-slate-800 rounded text-[10px] text-slate-300 flex items-center">Learn More</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center text-[10px]">
                    <div className="bg-slate-900 p-1.5 rounded"><strong className="text-white">12.8K</strong><br/><span className="text-slate-500">Users</span></div>
                    <div className="bg-slate-900 p-1.5 rounded"><strong className="text-white">$48.2K</strong><br/><span className="text-slate-500">Revenue</span></div>
                    <div className="bg-slate-900 p-1.5 rounded"><strong className="text-white">99.9%</strong><br/><span className="text-slate-500">Uptime</span></div>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs text-slate-300 border border-slate-800/80">
                  <pre>{`from pylage_layout.patterns import Hero, StatsSection

content = Container(
    Hero(title="Welcome", description="Instant dashboards", actions=["Start"]),
    StatsSection(stats=[{"label": "Users", "value": "12.8K"}])
)`}</pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: WS PROTOCOL STREAM ==================== */}
        {activeTab === 'protocol' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="font-semibold text-sm text-slate-100">Live WebSocket Protocol Inspector</h3>
                  <p className="text-xs text-slate-400">Observes wire messages exchanged between Python server and browser runtime</p>
                </div>
              </div>
              <button
                id="btn-clear-logs"
                onClick={() => setLogs([])}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded border border-slate-700 flex items-center gap-1 transition"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear Stream
              </button>
            </div>

            {/* Protocol logs table */}
            <div className="bg-slate-950 rounded-xl border border-slate-800/80 p-3 overflow-auto max-h-[500px] flex flex-col gap-2 font-mono text-xs">
              {logs.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  No frames recorded yet. Trigger any button or input in the Playground to see wire frames.
                </div>
              ) : (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-3 rounded-lg border flex flex-col gap-1.5 ${
                      log.direction === 'server_to_client'
                        ? 'bg-indigo-950/20 border-indigo-800/40 text-indigo-200'
                        : 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-1.5 py-0.5 rounded font-bold uppercase text-[9px] ${
                            log.direction === 'server_to_client'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-emerald-600 text-white'
                          }`}
                        >
                          {log.direction === 'server_to_client' ? '← SVR PUSH' : '→ CLI EVENT'}
                        </span>
                        <span className="font-semibold text-slate-300">type: "{log.type}"</span>
                      </div>
                      <span className="text-slate-500">{log.timestamp}</span>
                    </div>
                    <pre className="text-[11px] text-slate-300 overflow-x-auto bg-slate-900/80 p-2 rounded border border-slate-800/60">
                      {JSON.stringify(log.data, null, 2)}
                    </pre>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB 5: SPECS & AUDIT ==================== */}
        {activeTab === 'docs' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Framework Specification & Architectural Fixes</h3>
              <p className="text-xs text-slate-400">
                PyLage UI core reactivity contract, dependency graph, and solved architectural items.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>C1. Dynamic Tree State & Event Re-Indexing</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <code className="text-indigo-300">StateBinding.bind_tree()</code> and <code className="text-indigo-300">EventDispatcher.index()</code> dynamically wire subtrees added via <code className="text-indigo-300">root.add()</code> or <code className="text-indigo-300">replace()</code> post-startup.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>C3. Identity-Based Component Equality</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <code className="text-indigo-300">@dataclass(eq=False)</code> enforces reference-identity semantics and prevents ambiguous NumPy/pandas array comparison crashes.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>C4. State Cycle Guard & Guarded Equality</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Re-entrancy detector prevents silent stack overflow in synchronous callbacks and raises <code className="text-amber-300">CircularStateDependencyError</code>.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>C6. Dynamic DOM Event Binding</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Client runtime dynamically parses <code className="text-indigo-300">data-pylage-events</code> on elements, supporting <code className="text-indigo-300">on_submit</code>, <code className="text-indigo-300">on_focus</code>, and all custom handlers.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/60 px-4 lg:px-8 py-4 mt-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>⚡ <strong>PyLage UI</strong> — Reactive Python Web Framework</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Dual Licensed: AGPLv3 / Commercial</span>
          <span>•</span>
          <span>Fast, WebSocket-synced Python Dashboards</span>
        </div>
      </footer>
    </div>
  );
}
