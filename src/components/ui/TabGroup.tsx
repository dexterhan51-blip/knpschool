"use client";

import { useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabGroupProps {
  tabs: Tab[];
  children: (activeTabId: string) => React.ReactNode;
}

export default function TabGroup({ tabs, children }: TabGroupProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div>
      <div className="hide-scrollbar -mx-4 mb-8 flex overflow-x-auto px-4 md:mx-0 md:justify-center md:px-0">
        <div className="flex min-w-max gap-1 rounded-xl bg-navy-light/50 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-orange text-white shadow-lg"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="animate-slide-down" key={activeTab}>
        {children(activeTab)}
      </div>
    </div>
  );
}
