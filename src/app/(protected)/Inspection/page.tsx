"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  Camera,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  Download,
  Zap,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Cpu,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";
import { API } from "@/utils/api";
import { ResultDialog } from "./result";

// Sample inspection data
const inspectionHistory = [
  {
    id: "INS-2024-001",
    partNumber: "STM32F407VGT6",
    manufacturer: "STMicroelectronics",
    uploadedBy: "John Anderson",
    timestamp: "2024-10-14 14:32:15",
    result: "Genuine",
    confidence: 98.5,
    processingTime: "1.8s",
    imageName: "stm32_front.jpg",
  },
  {
    id: "INS-2024-002",
    partNumber: "ATMEGA2560",
    manufacturer: "Microchip/Atmel",
    uploadedBy: "Sarah Mitchell",
    timestamp: "2024-10-14 13:45:22",
    result: "Genuine",
    confidence: 95.2,
    processingTime: "1.6s",
    imageName: "atmega_chip.jpg",
  },
  {
    id: "INS-2024-003",
    partNumber: "ESP32-WROOM-32",
    manufacturer: "Espressif Systems",
    uploadedBy: "Michael Chen",
    timestamp: "2024-10-14 12:18:44",
    result: "Counterfeit",
    confidence: 92.8,
    processingTime: "2.1s",
    imageName: "esp32_suspect.jpg",
  },
  {
    id: "INS-2024-004",
    partNumber: "IMXRT1062DVJ6",
    manufacturer: "NXP Semiconductors",
    uploadedBy: "Emma Thompson",
    timestamp: "2024-10-14 11:22:33",
    result: "Manual Review",
    confidence: 68.4,
    processingTime: "2.4s",
    imageName: "imxrt_unclear.jpg",
  },
  {
    id: "INS-2024-005",
    partNumber: "LM7805",
    manufacturer: "Texas Instruments",
    uploadedBy: "David Rodriguez",
    timestamp: "2024-10-14 10:05:19",
    result: "Genuine",
    confidence: 97.1,
    processingTime: "1.5s",
    imageName: "lm7805_voltage.jpg",
  },
];

const liveQueue = [
  {
    id: "QUEUE-001",
    partNumber: "BC547",
    status: "Processing",
    progress: 75,
    eta: "5s",
  },
  {
    id: "QUEUE-002",
    partNumber: "MT48LC16M16A2",
    status: "Analyzing",
    progress: 45,
    eta: "12s",
  },
  {
    id: "QUEUE-003",
    partNumber: "SN74HC595",
    status: "Queued",
    progress: 0,
    eta: "25s",
  },
];

const ocrResults = [
  { label: "Part Number", value: "STM32F407VGT6", confidence: 99.2 },
  { label: "Manufacturer", value: "STMicroelectronics", confidence: 98.5 },
  { label: "Date Code", value: "2023 WK42", confidence: 96.8 },
  { label: "Country of Origin", value: "Malaysia", confidence: 94.3 },
  { label: "Lot Number", value: "A8K3J92", confidence: 91.7 },
];

const visualAnalysis = [
  { feature: "Logo Verification", status: "Pass", confidence: 98.5 },
  { feature: "Font Consistency", status: "Pass", confidence: 97.2 },
  { feature: "Pin Alignment", status: "Pass", confidence: 99.1 },
  { feature: "Surface Quality", status: "Pass", confidence: 96.8 },
  { feature: "Marking Depth", status: "Pass", confidence: 95.4 },
];

export default function InspectionPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState<string | null>(
    null
  );
  const [result, setResult] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file upload here
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      const file = e.target.files?.[0];

      if (!file) {
        console.error("No file selected.");
        return;
      }

      console.log("File selected:", file);

      // Get token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found in localStorage.");
        return;
      }

      // Prepare FormData
      const formData = new FormData();
      formData.append("icImage", file);

      // Send request with file and authorization
      const res = await API.post("/inspection/verify", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Validate response
      if (!res.success) {
        console.error("Invalid response:", res);
        return;
      }

      console.log("Response:", res);
      setResult(res.inspection);
      return res.inspection;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Something went wrong while uploading.");
    } finally {
      setShow(true);
      setLoading(false);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setIsCameraActive(true);
      // Handle camera stream here
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 pt-[25vh] bg-black/30 backdrop-blur-md duration-300 flex justify-center w-full h-full z-50">
          <div className="w-50 h-50 bg-background p-10 flex flex-col justify-center items-center duration-300 rounded-xl border-primary/50">
            <img src="/images/loading.gif" alt="Loading..." />
          </div>
        </div>
      )}
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1
              className="text-2xl text-white mb-1"
              style={{ fontWeight: 700 }}
            >
              IC Inspection Center
            </h1>
            <p className="text-sm text-gray-400">
              Capture or upload IC images for automated authenticity
              verification
            </p>
          </div>
          <div >
            {show && <ResultDialog open={show} data={result} />}
            <Button variant="outline" className="ml-5 border-gray-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Upload/Capture Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Camera Capture Option */}
          <Card className="bg-[#0f0f0f] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#FF9933]" />
                Capture from Camera
              </CardTitle>
              <CardDescription>
                Use your device camera to capture IC images in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg bg-[#0a0a0a] border-2 border-dashed border-gray-700 flex items-center justify-center mb-4 overflow-hidden">
                {isCameraActive ? (
                  <div className="text-gray-400">
                    <video className="w-full h-full object-cover" autoPlay />
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">
                      Camera preview will appear here
                    </p>
                    <p className="text-xs text-gray-500">
                      {"Click Activate Camera to start"}
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handleCameraCapture}
                  className="w-full bg-[#FF9933] hover:bg-[#ff8800] text-black"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {isCameraActive ? "Capture Image" : "Activate Camera"}
                </Button>
                {isCameraActive && (
                  <Button
                    variant="outline"
                    onClick={() => setIsCameraActive(false)}
                    className="w-full border-gray-700"
                  >
                    Cancel
                  </Button>
                )}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-xs text-blue-400">
                  💡 Tip: Ensure good lighting and focus for best results
                </p>
              </div>
            </CardContent>
          </Card>

          {/* File Upload Option */}
          <Card className="bg-[#0f0f0f] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#FF9933]" />
                Upload Image File
              </CardTitle>
              <CardDescription>
                Upload existing IC images from your device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`aspect-video rounded-lg border-2 border-dashed transition-colors ${
                  isDragging
                    ? "border-[#FF9933] bg-[#FF9933]/10"
                    : "border-gray-700 bg-[#0a0a0a]"
                } flex items-center justify-center mb-4`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="text-center p-6">
                  <Upload className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">
                    Drag and drop IC images here
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    or click below to browse files
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <label htmlFor="file-upload" className="block">
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    asChild
                    className="w-full bg-[#FF9933] hover:bg-[#ff8800] text-black cursor-pointer"
                  >
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Browse Files
                    </span>
                  </Button>
                </label>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-xs text-green-400">
                  ✓ Supports: JPG, PNG, HEIC (Max 5MB per file)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Optional Metadata Input */}
        <Card className="bg-[#0f0f0f] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">
              Additional Information (Optional)
            </CardTitle>
            <CardDescription>
              Provide extra details to improve verification accuracy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partNumber">Part Number</Label>
                <Input
                  id="partNumber"
                  placeholder="e.g., STM32F407VGT6"
                  className="bg-[#0a0a0a] border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manufacturer">Manufacturer</Label>
                <Input
                  id="manufacturer"
                  placeholder="e.g., STMicroelectronics"
                  className="bg-[#0a0a0a] border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batch">Batch/Lot Number</Label>
                <Input
                  id="batch"
                  placeholder="e.g., A8K3J92"
                  className="bg-[#0a0a0a] border-gray-700 text-white"
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional information about this IC..."
                className="bg-[#0a0a0a] border-gray-700 text-white"
                rows={3}
              />
            </div>
            <div className="mt-6 flex justify-end">
              <Button className="bg-[#FF9933] hover:bg-[#ff8800] text-black px-8">
                <Zap className="w-4 h-4 mr-2" />
                Start Inspection
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Processing Queue */}
        <Card className="bg-[#0f0f0f] border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">
                  Live Processing Queue
                </CardTitle>
                <CardDescription>Real-time inspection status</CardDescription>
              </div>
              <Badge
                variant="outline"
                className="bg-green-500/20 text-green-400 border-green-500/30"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                {liveQueue.length} Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {liveQueue.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg bg-[#0a0a0a] border border-gray-800"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#FF9933]/20 flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-[#FF9933]" />
                      </div>
                      <div>
                        <div
                          className="text-white text-sm"
                          style={{ fontWeight: 600 }}
                        >
                          {item.partNumber}
                        </div>
                        <div className="text-xs text-gray-500">{item.id}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className="bg-blue-500/20 text-blue-400 border-blue-500/30"
                      >
                        {item.status}
                      </Badge>
                      <span className="text-sm text-gray-400">
                        ETA: {item.eta}
                      </span>
                    </div>
                  </div>
                  <Progress value={item.progress} className="h-2 bg-gray-800" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="bg-[#0f0f0f] border border-gray-800">
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-[#FF9933]/20 data-[state=active]:text-[#FF9933]"
            >
              <FileText className="w-4 h-4 mr-2" />
              Inspection History
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-[#FF9933]/20 data-[state=active]:text-[#FF9933]"
            >
              <Eye className="w-4 h-4 mr-2" />
              Detailed Results
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-[#FF9933]/20 data-[state=active]:text-[#FF9933]"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Inspection History Tab */}
          <TabsContent value="history">
            <Card className="bg-[#0f0f0f] border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    Recent Inspections
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        placeholder="Search inspections..."
                        className="pl-10 w-64 bg-[#0a0a0a] border-gray-800 text-white"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800 hover:bg-transparent">
                      <TableHead className="text-gray-400">
                        INSPECTION ID
                      </TableHead>
                      <TableHead className="text-gray-400">
                        PART NUMBER
                      </TableHead>
                      <TableHead className="text-gray-400">
                        MANUFACTURER
                      </TableHead>
                      <TableHead className="text-gray-400">TIMESTAMP</TableHead>
                      <TableHead className="text-gray-400">RESULT</TableHead>
                      <TableHead className="text-gray-400">
                        CONFIDENCE
                      </TableHead>
                      <TableHead className="text-gray-400">TIME</TableHead>
                      <TableHead className="text-gray-400">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inspectionHistory.map((inspection) => (
                      <TableRow
                        key={inspection.id}
                        className="border-gray-800 hover:bg-gray-800/50"
                      >
                        <TableCell className="text-white">
                          {inspection.id}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-[#FF9933]/20 text-[#FF9933] border-[#FF9933]/30"
                          >
                            {inspection.partNumber}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {inspection.manufacturer}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-300">
                            {inspection.timestamp.split(" ")[0]}
                          </div>
                          <div className="text-xs text-gray-500">
                            {inspection.timestamp.split(" ")[1]}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              inspection.result === "Genuine"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : inspection.result === "Counterfeit"
                                ? "bg-red-500/20 text-red-400 border-red-500/30"
                                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            }
                          >
                            {inspection.result === "Genuine" ? (
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                            ) : inspection.result === "Counterfeit" ? (
                              <XCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <AlertTriangle className="w-3 h-3 mr-1" />
                            )}
                            {inspection.result}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={inspection.confidence}
                              className="h-2 w-16 bg-gray-800"
                            />
                            <span className="text-sm text-white">
                              {inspection.confidence}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {inspection.processingTime}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-white"
                              onClick={() =>
                                setSelectedInspection(inspection.id)
                              }
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-white"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-400">10 per page</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">
                      Showing 1-5 of 1,847 results
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-[#0a0a0a] border-gray-700"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 bg-[#FF9933] border-[#FF9933] text-black"
                      >
                        1
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 bg-[#0a0a0a] border-gray-700 text-white"
                      >
                        2
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 bg-[#0a0a0a] border-gray-700 text-white"
                      >
                        3
                      </Button>
                      <span className="px-2 text-gray-400">...</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-[#0a0a0a] border-gray-700"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Detailed Results Tab */}
          <TabsContent value="details">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* IC Image */}
              <Card className="bg-[#0f0f0f] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Uploaded Image</CardTitle>
                  <CardDescription>Original IC photograph</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg bg-[#0a0a0a] border border-gray-800 flex items-center justify-center mb-4">
                    <ImageIcon className="w-16 h-16 text-gray-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">File Name:</span>
                      <p className="text-white">stm32_front.jpg</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Resolution:</span>
                      <p className="text-white">2048 x 1536</p>
                    </div>
                    <div>
                      <span className="text-gray-400">File Size:</span>
                      <p className="text-white">1.2 MB</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Format:</span>
                      <p className="text-white">JPEG</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* OCR Results */}
              <Card className="bg-[#0f0f0f] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">
                    OCR Extraction Results
                  </CardTitle>
                  <CardDescription>
                    Text recognized from IC markings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ocrResults.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between"
                      >
                        <div className="flex-1">
                          <div className="text-sm text-gray-400 mb-1">
                            {result.label}
                          </div>
                          <div
                            className="text-white"
                            style={{ fontWeight: 600 }}
                          >
                            {result.value}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={result.confidence}
                            className="h-2 w-16 bg-gray-800"
                          />
                          <span className="text-sm text-[#FF9933]">
                            {result.confidence}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Visual Analysis */}
              <Card className="bg-[#0f0f0f] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">
                    Visual Feature Analysis
                  </CardTitle>
                  <CardDescription>
                    AI-powered visual inspection results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {visualAnalysis.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#0a0a0a] border border-gray-800"
                      >
                        <div className="flex items-center gap-3">
                          {item.status === "Pass" ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-400" />
                          )}
                          <span className="text-white">{item.feature}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="outline"
                            className={
                              item.status === "Pass"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                            }
                          >
                            {item.status}
                          </Badge>
                          <span className="text-sm text-gray-400">
                            {item.confidence}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Verification Summary */}
              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white">
                    Verification Summary
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Final authentication result
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-10 h-10 text-green-400" />
                    </div>
                    <h3
                      className="text-2xl text-green-400 mb-2"
                      style={{ fontWeight: 700 }}
                    >
                      GENUINE IC DETECTED
                    </h3>
                    <p className="text-gray-400">
                      Overall Confidence Score:{" "}
                      <span className="text-white">98.5%</span>
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-800">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">OEM Database Match:</span>
                      <span className="text-green-400">✓ Verified</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Visual Inspection:</span>
                      <span className="text-green-400">✓ Passed</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">OCR Verification:</span>
                      <span className="text-green-400">✓ Matched</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Processing Time:</span>
                      <span className="text-white">1.8 seconds</span>
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-green-500 hover:bg-green-600 text-black">
                    <Download className="w-4 h-4 mr-2" />
                    Download Full Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#0f0f0f] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">
                    Inspection Rate (Last 7 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Chart placeholder - Daily inspection volume
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0f0f0f] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">
                    Detection Accuracy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Chart placeholder - Accuracy metrics
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0f0f0f] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">
                    Top Manufacturers Inspected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "STMicroelectronics", count: 342 },
                      { name: "Microchip/Atmel", count: 298 },
                      { name: "Texas Instruments", count: 276 },
                      { name: "NXP Semiconductors", count: 234 },
                      { name: "Espressif Systems", count: 189 },
                    ].map((mfg, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-400">{mfg.name}</span>
                        <span
                          className="text-white"
                          style={{ fontWeight: 600 }}
                        >
                          {mfg.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0f0f0f] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">
                    Counterfeit Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Chart placeholder - Counterfeit detection over time
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
