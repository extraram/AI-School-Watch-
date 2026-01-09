
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { CameraDashboard } from './components/CameraDashboard';
import { AccessLogs } from './components/AccessLogs';
import { AuthorizedDatabase } from './components/AuthorizedDatabase';
import { Documentation } from './components/Documentation';
import { VivaPrep } from './components/VivaPrep';
import { AppTab, AuthorizedPerson, SurveillanceLog } from './types';

const INITIAL_PEOPLE: AuthorizedPerson[] = [
  { id: '1', name: 'Dr. Sarah Wilson', role: 'Teacher' },
  { id: '2', name: 'John Doe', role: 'Admin' },
  { id: '3', name: 'Emily Chen', role: 'Student' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [authorizedPeople, setAuthorizedPeople] = useState<AuthorizedPerson[]>(() => {
    const saved = localStorage.getItem('school_authorized_people');
    return saved ? JSON.parse(saved) : INITIAL_PEOPLE;
  });
  const [logs, setLogs] = useState<SurveillanceLog[]>(() => {
    const saved = localStorage.getItem('school_surveillance_logs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('school_authorized_people', JSON.stringify(authorizedPeople));
  }, [authorizedPeople]);

  useEffect(() => {
    localStorage.setItem('school_surveillance_logs', JSON.stringify(logs));
  }, [logs]);

  const handleAddLog = (log: SurveillanceLog) => {
    setLogs(prev => [log, ...prev].slice(0, 100)); // Keep last 100 logs
  };

  const clearLogs = () => {
    if (window.confirm("Are you sure you want to clear all access logs?")) {
      setLogs([]);
    }
  };

  const handleAddPerson = (person: AuthorizedPerson) => {
    setAuthorizedPeople(prev => [...prev, person]);
  };

  const handleRemovePerson = (id: string) => {
    setAuthorizedPeople(prev => prev.filter(p => p.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <CameraDashboard authorizedPeople={authorizedPeople} onNewLog={handleAddLog} />;
      case AppTab.LOGS:
        return <AccessLogs logs={logs} onClear={clearLogs} />;
      case AppTab.DATABASE:
        return (
          <AuthorizedDatabase 
            people={authorizedPeople} 
            onAdd={handleAddPerson} 
            onRemove={handleRemovePerson} 
          />
        );
      case AppTab.DOCS:
        return <Documentation />;
      case AppTab.VIVA:
        return <VivaPrep />;
      default:
        return <CameraDashboard authorizedPeople={authorizedPeople} onNewLog={handleAddLog} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
