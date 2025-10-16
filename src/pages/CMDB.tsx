import { useState } from "react";
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
  Search,
  Filter,
  MoreVertical,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const mockAssets = [
  {
    id: 1,
    category: "Infrastructure",
    parentId: "PAR001",
    assetId: "AST001",
    assetType: "Server",
    hostname: "srv-prod-01",
    ipAddress: "192.168.1.10",
    osName: "Ubuntu",
    osVersion: "22.04 LTS",
    vendor: "Dell",
    location: "Data Center A",
    ownerDepartment: "IT Operations",
    responsiblePerson: "John Doe",
    status: "Active",
    description: "Production server for web applications",
    created: "2024-01-15",
    lastUpdate: "2024-03-10",
  },
  {
    id: 2,
    category: "Virtualization",
    parentId: "PAR002",
    assetId: "AST002",
    assetType: "VM Host",
    hostname: "vmhost-01",
    ipAddress: "192.168.1.20",
    osName: "VMware ESXi",
    osVersion: "7.0",
    vendor: "VMware",
    location: "Data Center A",
    ownerDepartment: "Infrastructure",
    responsiblePerson: "Jane Smith",
    status: "Active",
    description: "Virtual machine host server",
    created: "2024-01-20",
    lastUpdate: "2024-03-08",
  },
  {
    id: 3,
    category: "Security",
    parentId: "PAR003",
    assetId: "AST003",
    assetType: "Firewall",
    hostname: "fw-edge-01",
    ipAddress: "192.168.1.254",
    osName: "Fortinet FortiOS",
    osVersion: "7.2",
    vendor: "Fortinet",
    location: "Data Center A",
    ownerDepartment: "Security Team",
    responsiblePerson: "Bob Wilson",
    status: "Maintenance",
    description: "Edge firewall for network security",
    created: "2024-02-01",
    lastUpdate: "2024-03-12",
  },
];

const CMDB = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<typeof mockAssets[0] | null>(null);
  const [newStatus, setNewStatus] = useState("");

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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-300";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  const getCategoryColor = (cat: string) => {
    return "bg-blue-100 text-blue-800 border-blue-300";
  };

  const handleChangeStatus = (asset: typeof mockAssets[0]) => {
    setSelectedAsset(asset);
    setNewStatus(asset.status);
    setIsStatusModalOpen(true);
  };

  const handleStatusSubmit = () => {
    // Handle status update logic here
    setIsStatusModalOpen(false);
    setSelectedAsset(null);
  };

  return (
    <div>
      <h1
        className="text-5xl font-bold mb-8"
        style={{ color: "#253040" }}
      >
        CMDB
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

      {/* Data Master Section */}
      <h2
        className="text-3xl font-bold mb-6"
        style={{ color: "#253040" }}
      >
        Data Master
      </h2>

      {/* Search and Filter Section */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            placeholder="Search"
            className="pl-10 bg-white border-gray-300"
            style={{ borderRadius: "8px" }}
          />
        </div>
        <Button
          style={{
            backgroundColor: "#384E66",
            color: "white",
            borderRadius: "8px",
            padding: "0 24px",
          }}
          className="hover:opacity-90"
        >
          <Filter size={18} className="mr-2" />
          Filter
        </Button>
      </div>

      {/* Table */}
      <div
        className="rounded-lg overflow-hidden shadow-sm mb-6"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
        }}
      >
        <Table>
          <TableHeader>
            <TableRow style={{ backgroundColor: "#384E66" }}>
              <TableHead className="text-white font-semibold">ID</TableHead>
              <TableHead className="text-white font-semibold">Category</TableHead>
              <TableHead className="text-white font-semibold">Parent ID</TableHead>
              <TableHead className="text-white font-semibold">Asset ID</TableHead>
              <TableHead className="text-white font-semibold">Asset Type</TableHead>
              <TableHead className="text-white font-semibold">Hostname</TableHead>
              <TableHead className="text-white font-semibold">IP Address</TableHead>
              <TableHead className="text-white font-semibold">OS Name</TableHead>
              <TableHead className="text-white font-semibold">OS Version</TableHead>
              <TableHead className="text-white font-semibold">Vendor</TableHead>
              <TableHead className="text-white font-semibold">Location</TableHead>
              <TableHead className="text-white font-semibold">Owner Department</TableHead>
              <TableHead className="text-white font-semibold">Responsible Person</TableHead>
              <TableHead className="text-white font-semibold">Status</TableHead>
              <TableHead className="text-white font-semibold">Description</TableHead>
              <TableHead className="text-white font-semibold">Created</TableHead>
              <TableHead className="text-white font-semibold">Last Update</TableHead>
              <TableHead className="text-white font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAssets.map((asset) => (
              <TableRow key={asset.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{asset.id}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getCategoryColor(asset.category)}
                  >
                    {asset.category}
                  </Badge>
                </TableCell>
                <TableCell>{asset.parentId}</TableCell>
                <TableCell>{asset.assetId}</TableCell>
                <TableCell>{asset.assetType}</TableCell>
                <TableCell>{asset.hostname}</TableCell>
                <TableCell>{asset.ipAddress}</TableCell>
                <TableCell>{asset.osName}</TableCell>
                <TableCell>{asset.osVersion}</TableCell>
                <TableCell>{asset.vendor}</TableCell>
                <TableCell>{asset.location}</TableCell>
                <TableCell>{asset.ownerDepartment}</TableCell>
                <TableCell>{asset.responsiblePerson}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getStatusColor(asset.status)}
                  >
                    {asset.status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">{asset.description}</TableCell>
                <TableCell>{asset.created}</TableCell>
                <TableCell>{asset.lastUpdate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white z-50">
                      <DropdownMenuItem
                        onClick={() => navigate(`/cmdb/detail/${asset.id}`)}
                      >
                        Detail
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate(`/cmdb/history/${asset.id}`)}
                      >
                        History
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleChangeStatus(asset)}>
                        Change Status
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={currentPage === 1} onClick={() => setCurrentPage(1)}>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={currentPage === 2} onClick={() => setCurrentPage(2)}>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={currentPage === 3} onClick={() => setCurrentPage(3)}>
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
              className={currentPage === 3 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Change Status Modal */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold" style={{ color: "#253040" }}>
              Change Status
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="w-full border-2" style={{ borderColor: "#384E66", borderRadius: "12px" }}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setIsStatusModalOpen(false)}
              variant="outline"
              className="flex-1"
              style={{ borderColor: "#384E66", borderRadius: "8px", borderWidth: "2px" }}
            >
              cancel
            </Button>
            <Button
              onClick={handleStatusSubmit}
              className="flex-1"
              style={{ backgroundColor: "#384E66", color: "white", borderRadius: "8px" }}
            >
              ok
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CMDB;
