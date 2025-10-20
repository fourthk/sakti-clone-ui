import { useState } from "react";
import { ArrowLeft, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ChangeManagementCalendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // January 2025
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = [];
    const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    
    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="p-3 text-center text-gray-400">
          {prevMonthDays - i}
        </div>
      );
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvent = scheduledChanges.some(sc => sc.date === dateStr);
      const isSelected = selectedDate?.getDate() === day && 
                        selectedDate?.getMonth() === currentDate.getMonth() &&
                        selectedDate?.getFullYear() === currentDate.getFullYear();
      const isToday = day === 7 || day === 10; // Highlighting dates 7 and 10 as in reference
      
      days.push(
        <div
          key={`current-${day}`}
          className={`p-3 text-center cursor-pointer rounded-lg transition-all hover:bg-gray-100 ${
            isToday ? 'bg-blue-500 text-white font-bold' : ''
          } ${isSelected ? 'ring-2 ring-blue-500' : ''} ${hasEvent ? 'font-semibold' : ''}`}
          onClick={() => {
            const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            setSelectedDate(newDate);
          }}
        >
          {day}
        </div>
      );
    }
    
    // Next month days
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className="p-3 text-center text-gray-400">
          {day}
        </div>
      );
    }
    
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const filteredScheduledChanges = selectedDate
    ? scheduledChanges.filter(sc => {
        const scDate = new Date(sc.date);
        return scDate.getDate() === selectedDate.getDate() &&
               scDate.getMonth() === selectedDate.getMonth() &&
               scDate.getFullYear() === selectedDate.getFullYear();
      })
    : scheduledChanges;

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

      {/* Full Calendar */}
      <Card style={{ backgroundColor: "#FDFDFD", borderColor: "#384E66" }} className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle style={{ color: "#253040" }}>
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevMonth}
                style={{ borderColor: "#384E66" }}
              >
                <ChevronLeft size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextMonth}
                style={{ borderColor: "#384E66" }}
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full max-w-4xl mx-auto">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                <div key={day} className="text-center font-semibold text-gray-600 p-2">
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {renderCalendar()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Section */}
      <Card style={{ backgroundColor: "#FDFDFD", borderColor: "#384E66" }}>
        <CardHeader>
          <CardTitle style={{ color: "#253040" }}>
            {selectedDate 
              ? `Schedule for ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
              : 'Scheduled Changes'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredScheduledChanges.map((day, index) => (
              <div key={index}>
                <div className="flex items-center gap-3 mb-4 pb-2 border-b" style={{ borderColor: "#E5E7EB" }}>
                  <CalendarIcon size={20} style={{ color: "#384E66" }} />
                  <h3 className="font-semibold" style={{ color: "#253040" }}>
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                </div>
                <div className="space-y-3">
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangeManagementCalendar;
