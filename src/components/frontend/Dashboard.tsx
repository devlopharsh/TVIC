"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  Filter,
  Eye,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { API } from "@/utils/api";

// Sample data for charts
const inspectionTrendData = [
  { date: "Jan 1", inspections: 145, anomalies: 12, failures: 8 },
  { date: "Jan 8", inspections: 152, anomalies: 15, failures: 10 },
  { date: "Jan 15", inspections: 148, anomalies: 10, failures: 7 },
  { date: "Jan 22", inspections: 165, anomalies: 18, failures: 12 },
  { date: "Jan 29", inspections: 158, anomalies: 14, failures: 9 },
  { date: "Feb 5", inspections: 172, anomalies: 11, failures: 6 },
  { date: "Feb 12", inspections: 155, anomalies: 16, failures: 11 },
];

const detectionMethodsData = [
  { name: "Visual Inspection", value: 42, color: "#3B82F6" },
  { name: "AI-ML Verification", value: 34, color: "#10B981" },
  { name: "OCR", value: 24, color: "#F59E0B" },
];

const componentCategoriesData = [
  { name: "Microcontrollers", value: 35, color: "#FF9933" },
  { name: "Memory Chips", value: 28, color: "#3B82F6" },
  { name: "Logic Circuits", value: 22, color: "#10B981" },
  { name: "ICs", value: 15, color: "#F59E0B" },
];

const qualityConfidenceData = [
  { name: "High Confidence", value: 65, color: "#10B981" },
  { name: "Medium Confidence", value: 25, color: "#F59E0B" },
  { name: "Manual Verification", value: 10, color: "#EF4444" },
];

const liveReviewQueue = [
  {
    id: "IC-REF-0016",
    model: "STM32F407VGT6",
    manufacturer: "STMicroelectronics",
    confidence: "89%",
    priority: "high",
    status: "Pass",
    time: "2h ago",
  },
  {
    id: "ATMEGA-2560",
    model: "ATMEGA2560",
    manufacturer: "Microchip/Atmel",
    confidence: "72%",
    priority: "medium",
    status: "Under Review",
    time: "3h ago",
  },
  {
    id: "ESP32-WROOM-32",
    model: "ESP32",
    manufacturer: "Espressif Systems",
    confidence: "94%",
    priority: "high",
    status: "Pass",
    time: "4h ago",
  },
  {
    id: "IMXRT1062DVJ6",
    model: "i.MX RT1062",
    manufacturer: "NXP Semiconductors",
    confidence: "68%",
    priority: "high",
    status: "Failed",
    time: "5h ago",
  },
];

const threatAlerts = [
  {
    title: "High-Risk Suppliers",
    description: "New high-risk vendor added to black list (GH-0823-XM)",
    severity: "critical",
  },
  {
    title: "Suspicious Anomalies",
    description: "Abnormal marking pattern detected in batch #8834",
    severity: "warning",
  },
  {
    title: "ML Confidence Trigger",
    description: "Model flagged IC batch for manual re-check (ID: 3299-2021)",
    severity: "info",
  },
];

const qualityMetrics = [
  { label: "False Positive Rate", value: "2.4%", trend: "down" },
  { label: "Detection Accuracy", value: "97.8%", trend: "up" },
  { label: "Processing Efficiency", value: "94.1%", trend: "up" },
  { label: "Service Availability", value: "99.7%", trend: "up" },
];

const teamPerformance = [
  {
    name: "Sarah Mitchell",
    role: "Lead Inspector",
    reviews: 342,
    accuracy: 98,
  },
  {
    name: "Mike Rodriguez",
    role: "QA Specialist",
    reviews: 298,
    accuracy: 95,
  },
  {
    name: "Emily Chen",
    role: "Senior Analyst",
    reviews: 267,
    accuracy: 97,
  },
  {
    name: "James Wilson",
    role: "Tech Lead",
    reviews: 245,
    accuracy: 96,
  },
];

export function Dashboard() {
  const [data, setData] = useState<any>();

  async function fetchDashData() {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found in localStorage.");
        return;
      }

      // Send request with Authorization header
      const res = await API.get("/inspection/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check response
      if (!res || !res.data) {
        console.error("Invalid response:", res);
        return;
      }

      setData(res.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }

  useEffect(() => {
    fetchDashData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-blue-400">
                TOTAL ICs SCANNED
              </CardDescription>
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white" style={{ fontWeight: 700 }}>
              2,847,293
            </div>
            <p className="text-xs text-gray-400 mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-green-400">
                AUTHENTIC YES
              </CardDescription>
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white" style={{ fontWeight: 700 }}>
              97.83%
            </div>
            <p className="text-xs text-gray-400 mt-1">Verification accuracy</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-red-400">
                FAKE ICs DETECTED
              </CardDescription>
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white" style={{ fontWeight: 700 }}>
              47,832
            </div>
            <p className="text-xs text-gray-400 mt-1">
              -5.2% reduction this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-yellow-400">
                NEEDS REVIEW
              </CardDescription>
              <Clock className="w-4 h-4 text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white" style={{ fontWeight: 700 }}>
              14,314
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Manual verification queue
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inspection Trends Chart */}
        <Card className="lg:col-span-3 bg-[#0f0f0f] border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">
                  Inspection Trends & Anomaly Spikes
                </CardTitle>
                <CardDescription>
                  Real-time detection of anomalies and failures across time
                  periods
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="bg-green-500/20 text-green-400 border-green-500/30"
                >
                  Authentic
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-red-500/20 text-red-400 border-red-500/30"
                >
                  Fake Detection
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                >
                  Pending Review
                </Badge>
                <Button variant="outline" size="sm" className="border-gray-700">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={inspectionTrendData}>
                <defs>
                  <linearGradient
                    id="colorInspections"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorAnomalies"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="date" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f0f0f",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="inspections"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorInspections)"
                  name="Inspections"
                />
                <Area
                  type="monotone"
                  dataKey="anomalies"
                  stroke="#F59E0B"
                  fillOpacity={1}
                  fill="url(#colorAnomalies)"
                  name="Anomalies"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pie Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#0f0f0f] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-sm">
              Detection Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={detectionMethodsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {detectionMethodsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {detectionMethodsData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-400">{item.name}</span>
                  </div>
                  <span className="text-white" style={{ fontWeight: 600 }}>
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f0f0f] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-sm">
              Component Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={componentCategoriesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {componentCategoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {componentCategoriesData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-400">{item.name}</span>
                  </div>
                  <span className="text-white" style={{ fontWeight: 600 }}>
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f0f0f] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-sm">
              Quality Confidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={qualityConfidenceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {qualityConfidenceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {qualityConfidenceData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-400">{item.name}</span>
                  </div>
                  <span className="text-white" style={{ fontWeight: 600 }}>
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Review Queue */}
      <Card className="bg-[#0f0f0f] border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Live Review Queue</CardTitle>
              <CardDescription>
                Components requiring manual QA attention and re-verification
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gray-700">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="border-gray-700">
                Filter by Priority
              </Button>
              <Button className="bg-[#FF9933] hover:bg-[#ff8800] text-black">
                Review Queue
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400">Part Number</TableHead>
                <TableHead className="text-gray-400">Model</TableHead>
                <TableHead className="text-gray-400">Manufacturer</TableHead>
                <TableHead className="text-gray-400">Confidence</TableHead>
                <TableHead className="text-gray-400">Priority</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Time</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {liveReviewQueue.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-gray-800 hover:bg-gray-800/50"
                >
                  <TableCell className="text-white">{item.id}</TableCell>
                  <TableCell className="text-gray-300">{item.model}</TableCell>
                  <TableCell className="text-gray-300">
                    {item.manufacturer}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        parseInt(item.confidence) > 85
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : parseInt(item.confidence) > 70
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }
                    >
                      {item.confidence}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        item.priority === "high"
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }
                    >
                      {item.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        item.status === "Pass"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : item.status === "Failed"
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-400">{item.time}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#FF9933] hover:text-[#ff8800] hover:bg-[#FF9933]/10"
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Intelligence */}
        <Card className="bg-[#0f0f0f] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Threat Intelligence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {threatAlerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  alert.severity === "critical"
                    ? "bg-red-500/10 border-red-500/30"
                    : alert.severity === "warning"
                    ? "bg-yellow-500/10 border-yellow-500/30"
                    : "bg-blue-500/10 border-blue-500/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle
                        className={`w-4 h-4 ${
                          alert.severity === "critical"
                            ? "text-red-400"
                            : alert.severity === "warning"
                            ? "text-yellow-400"
                            : "text-blue-400"
                        }`}
                      />
                      <h4
                        className={`text-sm ${
                          alert.severity === "critical"
                            ? "text-red-400"
                            : alert.severity === "warning"
                            ? "text-yellow-400"
                            : "text-blue-400"
                        }`}
                        style={{ fontWeight: 600 }}
                      >
                        {alert.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-400">{alert.description}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      alert.severity === "critical"
                        ? "bg-red-500/20 text-red-400 border-red-500/30"
                        : alert.severity === "warning"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                    }
                  >
                    {alert.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quality Metrics */}
        <Card className="bg-[#0f0f0f] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Quality Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {qualityMetrics.map((metric, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">{metric.label}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm text-[#FF9933]"
                      style={{ fontWeight: 600 }}
                    >
                      {metric.value}
                    </span>
                    <TrendingUp
                      className={`w-4 h-4 ${
                        metric.trend === "up"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    />
                  </div>
                </div>
                <Progress
                  value={parseFloat(metric.value)}
                  className="h-2 bg-gray-800"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* QA Team Performance */}
      <Card className="bg-[#0f0f0f] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">QA Team Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamPerformance.map((member, index) => (
              <div key={index} className="text-center">
                <Avatar className="w-16 h-16 mx-auto mb-3 border-2 border-[#FF9933]/30">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-[#FF9933]/20 text-[#FF9933]">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h4 className="text-white text-sm" style={{ fontWeight: 600 }}>
                  {member.name}
                </h4>
                <p className="text-xs text-gray-500 mb-2">{member.role}</p>
                <div className="text-xs text-gray-400">
                  <span className="text-[#FF9933]">
                    {member.reviews} reviews
                  </span>{" "}
                  • <span className="text-green-400">{member.accuracy}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
