interface AccordionItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  selectedItemId: string;
  onItemSelect: (itemId: string) => void;
  title?: string;
  className?: string;
}

export function Accordion({ 
  items, 
  selectedItemId, 
  onItemSelect, 
  title,
  className = "" 
}: AccordionProps) {
  return (
    <div className={`w-full lg:w-auto lg:min-w-72 lg:max-w-80 bg-theme-surface rounded-xl p-4 ${className}`}>
      {title && (
        <h3 className="text-theme-primary text-lg font-semibold mb-4">{title}</h3>
      )}
      <div className="max-h-80 overflow-y-auto space-y-2 scrollbar-custom">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemSelect(item.id)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              selectedItemId === item.id
                ? "bg-primary text-on-primary"
                : "bg-theme-button text-theme-button hover:bg-theme-button-hover"
            }`}
          >
            <div className="font-medium text-sm">{item.title}</div>
            {item.subtitle && (
              <div className="text-xs opacity-80 mt-1">{item.subtitle}</div>
            )}
            {item.description && (
              <div className="text-xs opacity-60 mt-1">{item.description}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
