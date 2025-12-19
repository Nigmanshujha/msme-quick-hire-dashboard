
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Bell, 
  Briefcase, 
  MapPin, 
  Filter, 
  QrCode, 
  Plus, 
  Zap,
  TrendingUp,
  LayoutGrid,
  Menu,
  ChevronRight,
  UserPlus,
  Truck,
  Store,
  Home,
  Utensils,
  History,
  Info
} from 'lucide-react';
import { MOCK_CANDIDATES, ROLE_TEMPLATES } from './constants';
import { Candidate, FilterState, HireStatus } from './types';
import { CandidateCard } from './components/CandidateCard';
import { VoiceSearch } from './components/VoiceSearch';
import { CallModal } from './components/CallModal';
import { HireModal } from './components/HireModal';
import { MassHireModal } from './components/MassHireModal';
import { FilterModal } from './components/FilterModal';
import { PostJobModal } from './components/PostJobModal';

interface Activity {
  id: string;
  message: string;
  timestamp: string;
  type: 'hire' | 'scan' | 'update' | 'job';
}

const App: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
  const [filters, setFilters] = useState<FilterState>({});
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [activeCallCandidate, setActiveCallCandidate] = useState<Candidate | null>(null);
  const [activeHireCandidate, setActiveHireCandidate] = useState<Candidate | null>(null);
  const [showMassHire, setShowMassHire] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = (message: string, type: Activity['type']) => {
    const newActivity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 5));
  };

  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      const matchRole = filters.role ? c.role.toLowerCase().includes(filters.role.toLowerCase()) : true;
      const matchLocation = filters.location ? c.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
      const matchEdu = filters.education ? c.education === filters.education : true;
      const matchTemplate = selectedRole ? c.role.toLowerCase() === selectedRole.toLowerCase() : true;
      const notHired = c.status !== 'hired';
      return matchRole && matchLocation && matchEdu && matchTemplate && notHired;
    }).slice(0, filters.count || 100);
  }, [candidates, filters, selectedRole]);

  const stats = {
    total: filteredCandidates.length,
    active: filteredCandidates.filter(c => c.status === 'actively_looking').length,
    nearby: filteredCandidates.filter(c => parseFloat(c.distance) < 2).length
  };

  const handleStatusUpdate = (status: HireStatus) => {
    if (activeCallCandidate) {
      setCandidates(prev => prev.map(c => 
        c.id === activeCallCandidate.id ? { ...c, status: status === 'Hired' ? 'hired' : c.status } : c
      ));
      addActivity(`Call log updated for ${activeCallCandidate.name}: ${status}`, 'update');
      setActiveCallCandidate(null);
      if (status === 'Hired') {
        setActiveHireCandidate(activeCallCandidate);
        addActivity(`Backend: ${activeCallCandidate.name} status set to HIRED`, 'hire');
      }
    }
  };

  const handleMassHire = (ids: string[]) => {
    setCandidates(prev => prev.map(c => ids.includes(c.id) ? { ...c, status: 'hired' } : c));
    addActivity(`Mass Hire completed for ${ids.length} candidates`, 'hire');
    setShowMassHire(false);
  };

  const simulateSpotHire = () => {
    const newCandidate: Candidate = {
      id: Date.now().toString(),
      name: `Walk-in Candidate #${Math.floor(Math.random() * 900) + 100}`,
      role: selectedRole || 'Retail',
      location: 'Store Entrance',
      experience: 'Fresher',
      education: '10th Pass',
      salaryExpectation: '15,000',
      distance: '0.01 km',
      status: 'available',
      lastActive: 'Just now',
      phone: '+91 0000000000',
      imageUrl: `https://picsum.photos/seed/${Date.now()}/150/150`
    };
    setCandidates(prev => [newCandidate, ...prev]);
    addActivity(`New candidate appeared via QR Scan`, 'scan');
    setShowQR(false);
  };

  const getTemplateIcon = (iconName: string) => {
    switch (iconName) {
      case 'truck': return <Truck className="w-5 h-5" />;
      case 'store': return <Store className="w-5 h-5" />;
      case 'home': return <Home className="w-5 h-5" />;
      case 'utensils': return <Utensils className="w-5 h-5" />;
      default: return <Briefcase className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden lg:flex w-72 bg-white border-r border-gray-200 flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight">HireSwift</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <NavItem icon={<LayoutGrid />} label="Dashboard" active />
          <NavItem icon={<Users />} label="Candidates" />
          <NavItem icon={<Briefcase />} label="Jobs" />
          <NavItem icon={<MapPin />} label="Locations" />
          <NavItem icon={<Bell />} label="Notifications" badge="3" />
        </nav>

        {/* Backend Status Activity Sidebar Fragment */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-3 px-2">
            <History className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Backend Activity</span>
          </div>
          <div className="space-y-3">
            {activities.length === 0 ? (
              <p className="text-[10px] text-gray-400 px-2 italic">Waiting for activity...</p>
            ) : (
              activities.map(act => (
                <div key={act.id} className="bg-gray-50 p-2 rounded-lg border border-gray-100 animate-in slide-in-from-left-2">
                  <p className="text-[10px] font-bold text-gray-700 leading-tight">{act.message}</p>
                  <p className="text-[8px] text-gray-400 mt-1">{act.timestamp}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 px-4 md:px-8 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex lg:hidden items-center gap-2">
              <Menu className="w-6 h-6 text-gray-500" />
              <Zap className="w-6 h-6 text-blue-600" />
            </div>

            <VoiceSearch onFilter={setFilters} />

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowQR(true)}
                className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition-all flex items-center gap-2"
              >
                <QrCode className="w-5 h-5" />
                <span className="hidden md:inline font-bold text-sm">Spot Hiring</span>
              </button>
              <button 
                onClick={() => setShowPostJobModal(true)}
                className="bg-gray-900 text-white p-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-gray-200 hover:scale-105 transition-transform"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden md:inline font-bold text-sm">Post Job</span>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
          {/* Role Templates */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-blue-600" />
                Role Templates
              </h2>
              <button onClick={() => { setSelectedRole(null); setFilters({}); }} className="text-sm font-bold text-blue-600">Clear All</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {ROLE_TEMPLATES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role.id);
                    addActivity(`Template Applied: ${role.title}`, 'job');
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all text-left ${
                    selectedRole === role.id 
                      ? 'border-blue-600 bg-blue-50/50 shadow-md shadow-blue-50' 
                      : 'border-white bg-white hover:border-blue-200'
                  }`}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className={`p-2 rounded-lg inline-block mb-3 ${selectedRole === role.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {getTemplateIcon(role.icon)}
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm">{role.title}</h3>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-600">₹{role.suggestedSalary.split(' ')[0]}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<TrendingUp className="text-green-600" />} label="Actively Looking" value={stats.active} color="green" />
            <StatCard icon={<MapPin className="text-blue-600" />} label="Within 2km" value={stats.nearby} color="blue" />
            <StatCard icon={<UserPlus className="text-purple-600" />} label="Matched" value={stats.total} color="purple" />
          </section>

          {/* Feed */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-red-500 w-2.5 h-2.5 rounded-full animate-pulse"></div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight">Daily Hiring Feed</h2>
              </div>
              <button 
                onClick={() => setShowFilterModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            {filteredCandidates.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900">No matches found</h3>
                <p className="text-gray-500 text-sm">Update your job role or scan a QR code to add candidates.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCandidates.map((candidate) => (
                  <CandidateCard 
                    key={candidate.id} 
                    candidate={candidate} 
                    onCall={setActiveCallCandidate}
                    onHire={setActiveHireCandidate}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* FAB */}
      <div className="fixed bottom-8 right-8 z-40">
        <button 
          onClick={() => setShowMassHire(true)}
          className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-black shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform"
        >
          <Zap className="w-6 h-6" />
          Quick Match
        </button>
      </div>

      {/* Modals */}
      {activeCallCandidate && (
        <CallModal 
          candidate={activeCallCandidate} 
          onClose={() => setActiveCallCandidate(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}

      {activeHireCandidate && (
        <HireModal 
          candidate={activeHireCandidate} 
          onClose={() => setActiveHireCandidate(null)}
        />
      )}

      {showMassHire && (
        <MassHireModal 
          candidates={filteredCandidates}
          onClose={() => setShowMassHire(false)}
          onConfirm={handleMassHire}
        />
      )}

      {showFilterModal && (
        <FilterModal 
          currentFilters={filters}
          onApply={(f) => { setFilters(f); setShowFilterModal(false); addActivity('Custom Filters Applied', 'update'); }}
          onClose={() => setShowFilterModal(false)}
        />
      )}

      {showPostJobModal && (
        <PostJobModal 
          onClose={() => setShowPostJobModal(false)}
          onPost={(tpl) => {
            setSelectedRole(tpl.id);
            addActivity(`New Job Posted: ${tpl.title}`, 'job');
          }}
        />
      )}

      {showQR && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowQR(false)}>
          <div className="bg-white p-8 rounded-[2rem] text-center max-w-sm animate-in zoom-in" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Spot Hiring QR</h3>
            <p className="text-sm text-gray-500 mb-6">Candidate scans to join your dashboard</p>
            <div className="bg-gray-50 p-6 rounded-2xl mb-6 border-2 border-gray-100">
               <div className="w-48 h-48 bg-white mx-auto flex items-center justify-center border border-gray-200 rounded-lg shadow-inner mb-6 overflow-hidden">
                <div className="grid grid-cols-8 gap-1 p-2">
                  {[...Array(64)].map((_, i) => (
                    <div key={i} className={`w-4 h-4 ${Math.random() > 0.5 ? 'bg-gray-900' : 'bg-white'}`}></div>
                  ))}
                </div>
              </div>
              <button 
                onClick={simulateSpotHire}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Simulate Candidate Scan
              </button>
            </div>
            <button className="text-gray-400 font-bold text-sm" onClick={() => setShowQR(false)}>Close Modal</button>
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean, badge?: string }> = ({ icon, label, active, badge }) => (
  <a href="#" className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all ${
    active ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
  }`}>
    <div className="flex items-center gap-3">
      {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-5 h-5' })}
      <span className="text-sm">{label}</span>
    </div>
    {badge && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{badge}</span>}
  </a>
);

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: number, color: string }> = ({ icon, label, value, color }) => {
  const colorMap: any = {
    green: 'bg-green-50 text-green-700',
    blue: 'bg-blue-50 text-blue-700',
    purple: 'bg-purple-50 text-purple-700'
  };
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${colorMap[color]}`}>
          {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6' })}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-tight">{label}</p>
          <p className="text-2xl font-black text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
