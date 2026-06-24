import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const MultiSelect = ({ options, placeholder, icon: Icon, widthClass = "w-[100px]" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value) => {
    setSelected(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const isAllSelected = selected.length === options.length && options.length > 0;
  
  const toggleAll = () => {
    if (isAllSelected) {
      setSelected([]);
    } else {
      setSelected(options.map(o => o.value));
    }
  };

  const displayText = selected.length === 0 
    ? placeholder 
    : selected.length === 1 
      ? options.find(o => o.value === selected[0])?.label 
      : `${placeholder} (${selected.length})`;

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`${widthClass} flex items-center justify-between bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] text-xs rounded-md px-2 py-1.5 hover:border-red-700 focus:ring-1 focus:ring-red-700 transition-colors`}
      >
        <div className="flex items-center gap-1.5 truncate">
          {Icon && <Icon className="h-3.5 w-3.5 text-[var(--muted-foreground)] shrink-0" />}
          <span className="truncate">{displayText}</span>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-[var(--muted-foreground)] shrink-0 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 left-0 z-50 w-[180px] bg-[var(--background)] border border-[var(--border)] rounded-md shadow-xl py-1 max-h-60 overflow-y-auto">
          <div 
            className="flex items-center px-3 py-2 text-xs text-[var(--foreground)] hover:bg-white/5 cursor-pointer border-b border-[var(--border)]"
            onClick={toggleAll}
          >
            <div className={`w-3.5 h-3.5 border rounded-sm mr-2 flex items-center justify-center transition-colors ${isAllSelected ? 'bg-red-700 border-red-700' : 'border-[var(--muted-foreground)]'}`}>
              {isAllSelected && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
            </div>
            <span className="font-semibold text-red-600">Seleccionar Todos</span>
          </div>
          
          {options.map((option) => {
            const isSelected = selected.includes(option.value);
            return (
              <div 
                key={option.value}
                className="flex items-center px-3 py-2 text-xs text-[var(--foreground)] hover:bg-white/5 cursor-pointer transition-colors"
                onClick={() => toggleOption(option.value)}
              >
                <div className={`w-3.5 h-3.5 border rounded-sm mr-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-red-700 border-red-700' : 'border-[var(--muted-foreground)]'}`}>
                  {isSelected && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
                </div>
                <span className="truncate">{option.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
