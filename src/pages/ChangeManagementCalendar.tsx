import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ChangeManagementCalendar = () => {
  const navigate = useNavigate();

  const scheduledChanges = [
    {
      date: "2025-01-18",
      changes: [
        { id: "CHG-003", type: "Software Deployment", time: "14:00 - 16:00", status: "Completed" }
      ]
    },
    {
      date: "2025-01-20",
      changes: [
        { id: "CHG-001", type: "Infrastructure Update", time: "10:00 - 12:00", status: "Scheduled" }
      ]
    },
    {
      date: "2025-01-22",
      changes: [
        { id: "CHG-002", type: "Network Configuration", time: "09:00 - 10:00", status: "Approved" }
      ]
    },
    {
      date: "2025-01-25",
      changes: [
        { id: "CHG-004", type: "Security Patch", time: "08:00 - 17:00", status: "Scheduled" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      "Scheduled": "bg-purple-100 text-purple-800 border-purple-300",
      "Approved": "bg-green-100 text-green-800 border-green-300",
      "Completed": "bg-gray-100 text-gray-800 border-gray-300",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigate("/change-management")}
          style={{ borderColor: "#384E66" }}
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 
          className="text-5xl font-bold"
          style={{ color: "#253040" }}
        >
          Change Calendar
        </h1>
      </div>

      <div className="grid gap-6">
        {scheduledChanges.map((day, index) => (
          <Card key={index} style={{ backgroundColor: "#FDFDFD", borderColor: "#384E66" }}>
            <CardHeader style={{ backgroundColor: "#F3F4F6" }}>
              <CardTitle className="flex items-center gap-3" style={{ color: "#253040" }}>
                <CalendarIcon size={24} />
                {new Date(day.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {day.changes.map((change) => (
                  <div 
                    key={change.id}
                    className="flex items-center justify-between p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    style={{ backgroundColor: "#FAFAFA", borderLeft: "4px solid #384E66" }}
                    onClick={() => navigate("/change-management")}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-bold" style={{ color: "#253040" }}>{change.id}</p>
                        <Badge className={getStatusColor(change.status)}>{change.status}</Badge>
                      </div>
                      <p className="text-gray-700 mb-1">{change.type}</p>
                      <p className="text-sm text-gray-600">⏰ {change.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChangeManagementCalendar;
