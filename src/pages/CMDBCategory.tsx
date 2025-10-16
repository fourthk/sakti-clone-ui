import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Filter, MoreVertical, Search } from "lucide-react";
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
    category: "Infrastructure",
    parentId: "PAR001",
    assetId: "AST002",
    assetType: "Network Device",
    hostname: "sw-core-01",
    ipAddress: "192.168.1.1",
    osName: "Cisco IOS",
    osVersion: "15.2",
    vendor: "Cisco",
    location: "Data Center A",
    ownerDepartment: "Network Team",
    responsiblePerson: "Jane Smith",
    status: "Active",
    description: "Core switch for network backbone",
    created: "2024-01-20",
    lastUpdate: "2024-03-08",
  },
];

const CMDBCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/cmdb")}
          className="text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Back to CMDB"
        >
          <ArrowLeft size={24} />
        </button>
        <h1
          className="text-5xl font-bold"
          style={{ color: "#253040" }}
        >
          {category}
        </h1>
      </div>

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
                    <DropdownMenuContent align="end">
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
                      <DropdownMenuItem>Change Status</DropdownMenuItem>
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
    </div>
  );
};

export default CMDBCategory;
