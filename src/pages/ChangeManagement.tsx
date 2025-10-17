import { useState } from "react";
import { Calendar, Search, Filter, MoreVertical, ChevronRight, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

// Mock data
const mockChanges = [
  {
    id: "CHG-001",
    type: "Infrastructure Update",
    department: "IT Operations",
    affectedAssets: "Server-DB-01, Server-DB-02",
    pic: "John Doe",
    scheduleDate: "2025-01-20",
    status: "In Review",
    riskScore: 7.5,
    updatedAt: "2025-01-15 10:30",
    reason: "Upgrade database version for security patches",
    purpose: "Improve system security and performance",
    impact: "Minimal downtime expected during upgrade",
    implementation: "Rolling upgrade with backup procedures",
    technician: "Jane Smith"
  },
  {
    id: "CHG-002",
    type: "Network Configuration",
    department: "Network Team",
    affectedAssets: "Switch-Core-01",
    pic: "Alice Johnson",
    scheduleDate: "2025-01-22",
    status: "Approved",
    riskScore: 4.2,
    updatedAt: "2025-01-14 14:20",
    reason: "Configure VLAN for new department",
    purpose: "Improve network segmentation",
    impact: "No downtime expected",
    implementation: "Configuration change during maintenance window",
    technician: "Bob Wilson"
  },
  {
    id: "CHG-003",
    type: "Software Deployment",
    department: "Development",
    affectedAssets: "App-Server-05",
    pic: "Mike Brown",
    scheduleDate: "2025-01-18",
    status: "Completed",
    riskScore: 3.8,
    updatedAt: "2025-01-13 09:15",
    reason: "Deploy new application version",
    purpose: "Add new features requested by users",
    impact: "Brief service interruption",
    implementation: "Blue-green deployment strategy",
    technician: "Sarah Lee"
  },
  {
    id: "CHG-004",
    type: "Security Patch",
    department: "Security Team",
    affectedAssets: "All Workstations",
    pic: "Tom Wilson",
    scheduleDate: "2025-01-25",
    status: "Submitted",
    riskScore: 6.5,
    updatedAt: "2025-01-16 11:45",
    reason: "Critical security vulnerability patch",
    purpose: "Address CVE-2025-0001",
    impact: "Requires system restart",
    implementation: "Staged rollout across departments",
    technician: ""
  },
];

const getStatusColor = (status: string) => {
  const colors = {
    "Submitted": "bg-blue-100 text-blue-800 border-blue-300",
    "In Review": "bg-yellow-100 text-yellow-800 border-yellow-300",
    "Approved": "bg-green-100 text-green-800 border-green-300",
    "Scheduled": "bg-purple-100 text-purple-800 border-purple-300",
    "Implementing": "bg-orange-100 text-orange-800 border-orange-300",
    "Completed": "bg-gray-100 text-gray-800 border-gray-300",
    "Denied": "bg-red-100 text-red-800 border-red-300"
  };
  return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

const getRiskColor = (score: number) => {
  if (score >= 7) return "text-red-600 font-bold";
  if (score >= 5) return "text-orange-600 font-semibold";
  return "text-green-600 font-medium";
};

const ChangeManagement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeniedModal, setShowDeniedModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedChange, setSelectedChange] = useState<any>(null);
  const [denialReason, setDenialReason] = useState("");
  const [approvalForm, setApprovalForm] = useState({
    impact: "",
    implementation: "",
    schedule: "",
    technician: ""
  });

  const itemsPerPage = 5;
  const filteredChanges = statusFilter === "All" 
    ? mockChanges 
    : mockChanges.filter(c => c.status === statusFilter);
  
  const totalPages = Math.ceil(filteredChanges.length / itemsPerPage);
  const currentChanges = filteredChanges.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const summaryData = [
    { label: "Laporan Masuk", count: mockChanges.length, color: "bg-blue-500" },
    { label: "Changes in Review", count: mockChanges.filter(c => c.status === "In Review").length, color: "bg-yellow-500" },
    { label: "Approved", count: mockChanges.filter(c => c.status === "Approved").length, color: "bg-green-500" },
    { label: "Completed", count: mockChanges.filter(c => c.status === "Completed").length, color: "bg-gray-500" }
  ];

  const recentActivities = mockChanges
    .filter(c => c.status === "Approved")
    .slice(0, 5);

  const handleFormClick = (change: any) => {
    setSelectedChange(change);
    setShowFormModal(true);
  };

  const handleDetailClick = (change: any) => {
    navigate(`/change-management/detail/${change.id}`, { state: { change } });
  };

  const handleDenySubmit = () => {
    console.log("Denied:", denialReason);
    setShowDeniedModal(false);
    setShowFormModal(false);
    setDenialReason("");
  };

  const handleApproveSubmit = () => {
    console.log("Approved:", approvalForm);
    setShowApproveModal(false);
    setShowFormModal(false);
    setApprovalForm({ impact: "", implementation: "", schedule: "", technician: "" });
  };

  return (
    <div>
      <h1 
        className="text-5xl font-bold mb-8"
        style={{ color: "#253040" }}
      >
        Change Management
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {summaryData.map((item, index) => (
          <Card key={index} style={{ backgroundColor: "#FDFDFD", borderColor: "#384E66" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                  <p className="text-3xl font-bold" style={{ color: "#253040" }}>{item.count}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${item.color}`}></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Change Calendar and Recent Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card 
          style={{ backgroundColor: "#FDFDFD", borderColor: "#384E66" }}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate("/change-management/calendar")}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between" style={{ color: "#253040" }}>
              <span>Change Calendar</span>
              <ChevronRight size={24} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <Calendar size={64} style={{ color: "#384E66" }} />
            </div>
            <p className="text-center text-gray-600">Click to view detailed calendar</p>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: "#FDFDFD", borderColor: "#384E66" }}>
          <CardHeader>
            <CardTitle style={{ color: "#253040" }}>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: "#FAFAFA" }}>
                  <div>
                    <p className="font-semibold" style={{ color: "#253040" }}>{activity.id}</p>
                    <p className="text-sm text-gray-600">{activity.type}</p>
                  </div>
                  <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card style={{ backgroundColor: "#FDFDFD", borderColor: "#384E66" }}>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle style={{ color: "#253040" }}>Change Requests</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  placeholder="Search changes..." 
                  className="pl-10 w-64"
                  style={{ borderColor: "#384E66" }}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40" style={{ backgroundColor: "#3B82F6", color: "white", borderColor: "#3B82F6" }}>
                  <Filter size={16} className="mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Submitted">Submitted</SelectItem>
                  <SelectItem value="In Review">In Review</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Denied">Denied</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: "#384E66" }}>
                <TableHead className="text-white">Ticket ID</TableHead>
                <TableHead className="text-white">Jenis Perubahan</TableHead>
                <TableHead className="text-white">Dinas / Pengaju</TableHead>
                <TableHead className="text-white">Aset Terdampak</TableHead>
                <TableHead className="text-white">PIC</TableHead>
                <TableHead className="text-white">Jadwal Implementasi</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Skor Risiko</TableHead>
                <TableHead className="text-white">Updated At</TableHead>
                <TableHead className="text-white">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentChanges.map((change) => (
                <TableRow key={change.id}>
                  <TableCell className="font-medium">{change.id}</TableCell>
                  <TableCell>{change.type}</TableCell>
                  <TableCell>{change.department}</TableCell>
                  <TableCell>{change.affectedAssets}</TableCell>
                  <TableCell>{change.pic}</TableCell>
                  <TableCell>{change.scheduleDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(change.status)}>{change.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={getRiskColor(change.riskScore)}>{change.riskScore}</span>
                  </TableCell>
                  <TableCell>{change.updatedAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleFormClick(change)}
                      >
                        Form
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDetailClick(change)}
                      >
                        Detail
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      {/* Form Modal */}
      <Dialog open={showFormModal} onOpenChange={setShowFormModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Change Request Form - {selectedChange?.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Jenis Perubahan</Label>
              <Input value={selectedChange?.type} readOnly />
            </div>
            <div>
              <Label>Alasan</Label>
              <Textarea value={selectedChange?.reason} readOnly rows={3} />
            </div>
            <div>
              <Label>Tujuan</Label>
              <Textarea value={selectedChange?.purpose} readOnly rows={2} />
            </div>
            <div>
              <Label>Aset Terdampak</Label>
              <Input value={selectedChange?.affectedAssets} readOnly />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="destructive" 
              onClick={() => {
                setShowFormModal(false);
                setShowDeniedModal(true);
              }}
            >
              Denied
            </Button>
            <Button 
              onClick={() => {
                setShowFormModal(false);
                setShowApproveModal(true);
              }}
              style={{ backgroundColor: "#384E66" }}
            >
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Denied Modal */}
      <Dialog open={showDeniedModal} onOpenChange={setShowDeniedModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alasan Penolakan</DialogTitle>
          </DialogHeader>
          <div>
            <Label>Reason for Denial</Label>
            <Textarea 
              value={denialReason} 
              onChange={(e) => setDenialReason(e.target.value)}
              placeholder="Enter reason for denying this change request..."
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeniedModal(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDenySubmit}>Submit Denial</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Modal */}
      <Dialog open={showApproveModal} onOpenChange={setShowApproveModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Approval Form - {selectedChange?.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Dampak & Risiko</Label>
              <Textarea 
                value={approvalForm.impact}
                onChange={(e) => setApprovalForm({...approvalForm, impact: e.target.value})}
                placeholder="Describe impact and risks..."
                rows={3}
              />
            </div>
            <div>
              <Label>Rencana Implementasi</Label>
              <Textarea 
                value={approvalForm.implementation}
                onChange={(e) => setApprovalForm({...approvalForm, implementation: e.target.value})}
                placeholder="Implementation plan..."
                rows={3}
              />
            </div>
            <div>
              <Label>Jadwal Pelaksanaan</Label>
              <Input 
                type="datetime-local"
                value={approvalForm.schedule}
                onChange={(e) => setApprovalForm({...approvalForm, schedule: e.target.value})}
              />
            </div>
            <div>
              <Label>Assign to Technician</Label>
              <Input 
                value={approvalForm.technician}
                onChange={(e) => setApprovalForm({...approvalForm, technician: e.target.value})}
                placeholder="Technician name..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveModal(false)}>Cancel</Button>
            <Button onClick={handleApproveSubmit} style={{ backgroundColor: "#384E66" }}>
              Submit Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangeManagement;
