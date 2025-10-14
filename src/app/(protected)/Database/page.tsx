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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Database,
  Upload,
  FileText,
  Download,
  Trash2,
  Eye,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Calendar,
  HardDrive,
  File,
  CheckCircle2,
  Clock,
  AlertCircle,
  FolderOpen,
} from "lucide-react";

// Sample datasheet data
const datasheets = [
  {
    id: "DS-001",
    filename: "STM32F407VGT6_Datasheet.pdf",
    manufacturer: "STMicroelectronics",
    partNumber: "STM32F407VGT6",
    category: "Microcontroller",
    uploadDate: "2024-10-08",
    uploadedBy: "John Anderson",
    size: "2.4 MB",
    status: "Verified",
    downloads: 145,
    version: "Rev 5",
  },
  {
    id: "DS-002",
    filename: "ATMEGA2560_Technical_Reference.pdf",
    manufacturer: "Microchip/Atmel",
    partNumber: "ATMEGA2560",
    category: "Microcontroller",
    uploadDate: "2024-10-07",
    uploadedBy: "Sarah Mitchell",
    size: "1.8 MB",
    status: "Verified",
    downloads: 89,
    version: "Rev 3",
  },
  {
    id: "DS-003",
    filename: "ESP32-WROOM-32_Datasheet.pdf",
    manufacturer: "Espressif Systems",
    partNumber: "ESP32-WROOM-32",
    category: "Wireless Module",
    uploadDate: "2024-10-06",
    uploadedBy: "Michael Chen",
    size: "3.2 MB",
    status: "Verified",
    downloads: 203,
    version: "Rev 4",
  },
  {
    id: "DS-004",
    filename: "IMXRT1062_Reference_Manual.pdf",
    manufacturer: "NXP Semiconductors",
    partNumber: "IMXRT1062",
    category: "Processor",
    uploadDate: "2024-10-05",
    uploadedBy: "Emma Thompson",
    size: "5.1 MB",
    status: "Pending Review",
    downloads: 67,
    version: "Rev 2",
  },
  {
    id: "DS-005",
    filename: "LM7805_Voltage_Regulator.pdf",
    manufacturer: "Texas Instruments",
    partNumber: "LM7805",
    category: "Power Management",
    uploadDate: "2024-10-04",
    uploadedBy: "David Rodriguez",
    size: "845 KB",
    status: "Verified",
    downloads: 421,
    version: "Rev 8",
  },
  {
    id: "DS-006",
    filename: "BC547_Transistor_Datasheet.pdf",
    manufacturer: "ON Semiconductor",
    partNumber: "BC547",
    category: "Transistor",
    uploadDate: "2024-10-03",
    uploadedBy: "John Anderson",
    size: "512 KB",
    status: "Verified",
    downloads: 298,
    version: "Rev 6",
  },
  {
    id: "DS-007",
    filename: "MT48LC16M16A2_SDRAM.pdf",
    manufacturer: "Micron Technology",
    partNumber: "MT48LC16M16A2",
    category: "Memory",
    uploadDate: "2024-10-02",
    uploadedBy: "Sarah Mitchell",
    size: "1.9 MB",
    status: "Flagged",
    downloads: 76,
    version: "Rev 1",
  },
  {
    id: "DS-008",
    filename: "SN74HC595_Shift_Register.pdf",
    manufacturer: "Texas Instruments",
    partNumber: "SN74HC595",
    category: "Logic IC",
    uploadDate: "2024-10-01",
    uploadedBy: "Michael Chen",
    size: "678 KB",
    status: "Verified",
    downloads: 156,
    version: "Rev 4",
  },
];

const recentUploads = [
  {
    filename: "STM32F407VGT6_Datasheet.pdf",
    uploadedBy: "John Anderson",
    time: "2 hours ago",
  },
  {
    filename: "ATMEGA2560_Technical_Reference.pdf",
    uploadedBy: "Sarah Mitchell",
    time: "5 hours ago",
  },
  {
    filename: "ESP32-WROOM-32_Datasheet.pdf",
    uploadedBy: "Michael Chen",
    time: "1 day ago",
  },
];

const categoryDistribution = [
  { category: "Microcontroller", count: 145, percentage: 35 },
  { category: "Memory", count: 98, percentage: 24 },
  { category: "Processor", count: 76, percentage: 18 },
  { category: "Power Management", count: 54, percentage: 13 },
  { category: "Logic IC", count: 42, percentage: 10 },
];

export default function DatabasePage() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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

  return (
    <div className="p-6 space-y-6 w-[80vw]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>
            Datasheet Database
          </h1>
          <p className="text-sm text-gray-400">
            Manage and access component datasheets for verification
          </p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#FF9933] hover:bg-[#ff8800] text-black">
              <Upload className="w-4 h-4 mr-2" />
              Upload Datasheet
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0f0f0f] border-gray-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">
                Upload New Datasheet
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Add a new component datasheet to the database
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Drag & Drop Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging
                    ? "border-[#FF9933] bg-[#FF9933]/10"
                    : "border-gray-700 bg-[#0a0a0a]"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-white mb-2">
                  Drag and drop your datasheet here, or click to browse
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Supports PDF, DOC, DOCX (Max 10MB)
                </p>
                <Button variant="outline" className="border-gray-700">
                  Browse Files
                </Button>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input
                    id="manufacturer"
                    placeholder="e.g., STMicroelectronics"
                    className="bg-[#0a0a0a] border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partNumber">Part Number</Label>
                  <Input
                    id="partNumber"
                    placeholder="e.g., STM32F407VGT6"
                    className="bg-[#0a0a0a] border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger className="bg-[#0a0a0a] border-gray-700">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f0f0f] border-gray-700">
                      <SelectItem value="microcontroller">
                        Microcontroller
                      </SelectItem>
                      <SelectItem value="memory">Memory</SelectItem>
                      <SelectItem value="processor">Processor</SelectItem>
                      <SelectItem value="power">Power Management</SelectItem>
                      <SelectItem value="logic">Logic IC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="version">Version/Revision</Label>
                  <Input
                    id="version"
                    placeholder="e.g., Rev 5"
                    className="bg-[#0a0a0a] border-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="Brief description of the component"
                  className="bg-[#0a0a0a] border-gray-700"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  className="border-gray-700"
                  onClick={() => setIsUploadOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-[#FF9933] hover:bg-[#ff8800] text-black">
                  Upload Datasheet
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-blue-400">
                TOTAL DATASHEETS
              </CardDescription>
              <Database className="w-4 h-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div
              className="text-3xl text-white mb-1"
              style={{ fontWeight: 700 }}
            >
              2,847
            </div>
            <p className="text-xs text-gray-400">↑ 45 this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-green-400">
                VERIFIED DOCS
              </CardDescription>
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div
              className="text-3xl text-white mb-1"
              style={{ fontWeight: 700 }}
            >
              2,734
            </div>
            <p className="text-xs text-gray-400">96.0% verified</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-yellow-400">
                PENDING REVIEW
              </CardDescription>
              <Clock className="w-4 h-4 text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div
              className="text-3xl text-white mb-1"
              style={{ fontWeight: 700 }}
            >
              89
            </div>
            <p className="text-xs text-gray-400">Awaiting verification</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-purple-400">
                STORAGE USED
              </CardDescription>
              <HardDrive className="w-4 h-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div
              className="text-3xl text-white mb-1"
              style={{ fontWeight: 700 }}
            >
              14.2 GB
            </div>
            <p className="text-xs text-gray-400">of 100 GB capacity</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search datasheets by part number, manufacturer..."
            className="pl-10 bg-[#0f0f0f] border-gray-800 text-white"
          />
        </div>
        <Button
          variant="outline"
          className="bg-[#0f0f0f] border-gray-700 text-white"
        >
          All Categories
        </Button>
        <Button
          variant="outline"
          className="bg-[#0f0f0f] border-gray-700 text-white"
        >
          All Manufacturers
        </Button>
        <Button
          variant="outline"
          className="bg-[#0f0f0f] border-gray-700 text-white"
        >
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Datasheet Table */}
      <Card className="bg-[#0f0f0f] border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">All Datasheets</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gray-700">
                <Download className="w-4 h-4 mr-2" />
                Export List
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="w-8">
                  <input type="checkbox" className="rounded" />
                </TableHead>
                <TableHead className="text-gray-400">DOCUMENT</TableHead>
                <TableHead className="text-gray-400">MANUFACTURER</TableHead>
                <TableHead className="text-gray-400">PART NUMBER</TableHead>
                <TableHead className="text-gray-400">CATEGORY</TableHead>
                <TableHead className="text-gray-400">UPLOAD DATE</TableHead>
                <TableHead className="text-gray-400">SIZE</TableHead>
                <TableHead className="text-gray-400">STATUS</TableHead>
                <TableHead className="text-gray-400">DOWNLOADS</TableHead>
                <TableHead className="text-gray-400">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datasheets.map((datasheet) => (
                <TableRow
                  key={datasheet.id}
                  className="border-gray-800 hover:bg-gray-800/50"
                >
                  <TableCell>
                    <input type="checkbox" className="rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <div
                          className="text-white text-sm"
                          style={{ fontWeight: 600 }}
                        >
                          {datasheet.filename}
                        </div>
                        <div className="text-xs text-gray-500">
                          {datasheet.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {datasheet.manufacturer}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-[#FF9933]/20 text-[#FF9933] border-[#FF9933]/30"
                    >
                      {datasheet.partNumber}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {datasheet.category}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-300">
                      {datasheet.uploadDate}
                    </div>
                    <div className="text-xs text-gray-500">
                      by {datasheet.uploadedBy}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {datasheet.size}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        datasheet.status === "Verified"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : datasheet.status === "Pending Review"
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }
                    >
                      {datasheet.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {datasheet.downloads}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-white"
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
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
                Showing 1-8 of 2,847 results
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
                  size="sm"
                  className="h-8 bg-[#0a0a0a] border-gray-700 text-white"
                >
                  285
                </Button>
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

          {/* Bulk Actions */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-500">0 datasheets selected</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30"
              >
                Bulk Download
              </Button>
              <Button
                variant="outline"
                className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
              >
                Verify Selected
              </Button>
              <Button
                variant="outline"
                className="bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
              >
                Delete Selected
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Uploads */}
        <Card className="bg-[#0f0f0f] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUploads.map((upload, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-red-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white" style={{ fontWeight: 600 }}>
                    {upload.filename}
                  </p>
                  <p className="text-xs text-gray-400">
                    Uploaded by {upload.uploadedBy} • {upload.time}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#FF9933] hover:text-[#ff8800]"
                >
                  View
                </Button>
              </div>
            ))}
            <Button
              variant="link"
              className="text-[#FF9933] hover:text-[#ff8800] p-0 h-auto"
            >
              View all uploads
            </Button>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="bg-[#0f0f0f] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryDistribution.map((category, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-[#FF9933]" />
                    <span
                      className="text-sm text-white"
                      style={{ fontWeight: 600 }}
                    >
                      {category.category}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {category.count} files
                  </span>
                </div>
                <Progress
                  value={category.percentage}
                  className="h-2 bg-gray-800"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Storage Overview */}
      <Card className="bg-[#0f0f0f] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Storage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">
                  Total Storage Used
                </span>
                <span
                  className="text-sm text-white"
                  style={{ fontWeight: 600 }}
                >
                  14.2 GB / 100 GB
                </span>
              </div>
              <Progress value={14.2} className="h-3 bg-gray-800" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div
                  className="text-2xl text-blue-400 mb-1"
                  style={{ fontWeight: 700 }}
                >
                  8.4 GB
                </div>
                <p className="text-xs text-gray-400">PDF Documents</p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div
                  className="text-2xl text-green-400 mb-1"
                  style={{ fontWeight: 700 }}
                >
                  3.2 GB
                </div>
                <p className="text-xs text-gray-400">DOC/DOCX Files</p>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div
                  className="text-2xl text-purple-400 mb-1"
                  style={{ fontWeight: 700 }}
                >
                  2.1 GB
                </div>
                <p className="text-xs text-gray-400">Images & Diagrams</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div
                  className="text-2xl text-yellow-400 mb-1"
                  style={{ fontWeight: 700 }}
                >
                  0.5 GB
                </div>
                <p className="text-xs text-gray-400">Other Files</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
