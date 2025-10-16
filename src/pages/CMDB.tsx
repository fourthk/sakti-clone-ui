import { useNavigate } from "react-router-dom";
import {
  Server,
  Network,
  Laptop,
  Truck,
  FileCode,
  Globe,
  Lock,
  Wrench,
  FileText,
  Users,
  Cloud,
  Building,
} from "lucide-react";

interface CategoryCardProps {
  icon: React.ElementType;
  count: number;
  label: string;
  iconColor: string;
  onClick: () => void;
}

const CategoryCard = ({ icon: Icon, count, label, iconColor, onClick }: CategoryCardProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-lg p-6 flex items-center gap-4 shadow-sm transition-all hover:shadow-md hover:scale-105 w-full text-left"
      style={{
        backgroundColor: "#FDFDFD",
        border: "1px solid #384E66",
      }}
    >
      <div
        className="p-3 rounded-lg"
        style={{ backgroundColor: iconColor + "20" }}
      >
        <Icon size={32} style={{ color: iconColor }} />
      </div>
      <div>
        <div className="text-4xl font-bold" style={{ color: "#384E66" }}>
          {count}
        </div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </button>
  );
};

const CMDB = () => {
  const navigate = useNavigate();

  const categories = [
    { icon: Server, count: 48, label: "Infrastructure", iconColor: "#3B82F6" },
    { icon: Network, count: 156, label: "Virtualization", iconColor: "#8B5CF6" },
    { icon: Laptop, count: 67, label: "End User Devices", iconColor: "#EC4899" },
    { icon: Truck, count: 24, label: "Non-TI Supporting Assets", iconColor: "#F59E0B" },
    { icon: FileCode, count: 89, label: "Software & Logical CI", iconColor: "#10B981" },
    { icon: Globe, count: 32, label: "Network & Connectivity", iconColor: "#06B6D4" },
    { icon: Lock, count: 45, label: "Security", iconColor: "#EF4444" },
    { icon: Wrench, count: 28, label: "Services", iconColor: "#8B5CF6" },
    { icon: FileText, count: 52, label: "Documentation & Knowledge", iconColor: "#3B82F6" },
    { icon: Users, count: 120, label: "People & Organization", iconColor: "#EC4899" },
    { icon: Cloud, count: 38, label: "Cloud & External Service", iconColor: "#06B6D4" },
    { icon: Building, count: 15, label: "Environment & Facility", iconColor: "#64748B" },
  ];

  const handleCategoryClick = (label: string) => {
    navigate(`/cmdb/${encodeURIComponent(label)}`);
  };

  return (
    <div>
      <h1
        className="text-5xl font-bold mb-8"
        style={{ color: "#253040" }}
      >
        CMDB
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.label}
            icon={category.icon}
            count={category.count}
            label={category.label}
            iconColor={category.iconColor}
            onClick={() => handleCategoryClick(category.label)}
          />
        ))}
      </div>
    </div>
  );
};

export default CMDB;
