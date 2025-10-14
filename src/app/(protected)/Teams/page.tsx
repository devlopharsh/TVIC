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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Users,
  UserCheck,
  UserPlus,
  AlertTriangle,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Edit,
  Trash2,
  Lock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Activity,
} from "lucide-react";
import { Add } from "./add";

// User data
const usersData = [
  {
    id: "User 1",
    name: "John Anderson",
    email: "john.anderson@company.com",
    phone: "Verified",
    role: "Admin",
    roleColor: "blue",
    status: "Active",
    statusColor: "green",
    lastActive: "5 min ago",
    ip: "Tue Oct 1120",
    permissions: ["Edit", "Delete"],
  },
  {
    id: "User 2",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@company.com",
    phone: "Verified",
    role: "QA Manager",
    roleColor: "green",
    status: "Active",
    statusColor: "green",
    lastActive: "12 Minutes ago",
    ip: "Tue Oct 1120",
    permissions: ["Host", "Write"],
  },
  {
    id: "User 3",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    phone: "Not verified",
    role: "ML Engineer",
    roleColor: "orange",
    status: "Active",
    statusColor: "green",
    lastActive: "1 hour ago",
    ip: "Tue Oct 1120",
    permissions: ["Host", "Write", "Execute"],
  },
  {
    id: "User 4",
    name: "Emma Thompson",
    email: "emma.thompson@company.com",
    phone: "Awaiting",
    role: "Viewer",
    roleColor: "gray",
    status: "Pending",
    statusColor: "yellow",
    lastActive: "Never",
    ip: "Awaiting login",
    permissions: ["Read"],
  },
  {
    id: "User 5",
    name: "David Rodriguez",
    email: "david.rodriguez@company.com",
    phone: "Verified",
    role: "ML Engineer",
    roleColor: "orange",
    status: "Suspended",
    statusColor: "red",
    lastActive: "3 days ago",
    ip: "Mon Sep 2919",
    permissions: ["None"],
  },
];

const recentActivity = [
  {
    user: "John Anderson",
    action: "logged in",
    time: "5 minutes ago",
  },
  {
    user: "Sarah Mitchell",
    action: "updated profile",
    time: "13 minutes ago",
  },
  {
    user: "Emma Thompson",
    action: "invitation sent",
    time: "2 hours ago",
  },
  {
    user: "David Rodriguez",
    action: "account suspended",
    time: "3 days ago",
  },
];

const securityAlerts = [
  {
    title: "Multiple failed login attempts",
    description: "5 failed login attempts from IP: 192.168.0.5",
    severity: "critical",
    time: "2 hours ago",
  },
  {
    title: "Password expiry warning",
    description: "3 users with passwords expiring in 7 days",
    severity: "warning",
    time: "1 day ago",
  },
  {
    title: "New device login",
    description: "Sarah Mitchell logged in from ChromeOS/Win10",
    severity: "info",
    time: "2 days ago",
  },
];

const roleDistribution = [
  { name: "Admin", value: 12, color: "#3B82F6" },
  { name: "QA Manager", value: 45, color: "#10B981" },
  { name: "ML Engineer", value: 89, color: "#F59E0B" },
  { name: "Viewer", value: 101, color: "#6B7280" },
];

const systemHealth = [
  { name: "Authentication Service", status: "Online" },
  { name: "User Database", status: "Healthy" },
  { name: "Session Manager", status: "Active" },
  { name: "Email Service", status: "Active" },
];

const performanceMetrics = [
  { name: "CPU Usage", value: 23 },
  { name: "Memory Usage", value: 67 },
  { name: "Active Sessions", value: 45 },
  { name: "Network I/O", value: 12 },
];

export default function TeamPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>
            User & Access Control
          </h1>
          <p className="text-sm text-gray-400">
            Manage user accounts, roles, and system permissions
          </p>
        </div>
        <Add />
        {/* <Button className="bg-[#FF9933] hover:bg-[#ff8800] text-black">
          <UserPlus className="w-4 h-4 mr-2" />
          Add New User
        </Button> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-blue-400">
                TOTAL USERS
              </CardDescription>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div
              className="text-3xl text-white mb-1"
              style={{ fontWeight: 700 }}
            >
              247
            </div>
            <p className="text-xs text-gray-400">↑ 12 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-green-400">
                ACTIVE TODAY
              </CardDescription>
              <UserCheck className="w-4 h-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div
              className="text-3xl text-white mb-1"
              style={{ fontWeight: 700 }}
            >
              189
            </div>
            <p className="text-xs text-gray-400">↑ 18 today</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-yellow-400">
                PENDING INVITES
              </CardDescription>
              <UserPlus className="w-4 h-4 text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div
              className="text-3xl text-white mb-1"
              style={{ fontWeight: 700 }}
            >
              23
            </div>
            <p className="text-xs text-gray-400">↓ 5 awaiting soon</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-red-400">
                FAILED LOGINS
              </CardDescription>
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div
              className="text-3xl text-white mb-1"
              style={{ fontWeight: 700 }}
            >
              12
            </div>
            <p className="text-xs text-gray-400">↑ High privilege</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search users"
            className="pl-10 bg-[#0f0f0f] border-gray-800 text-white"
          />
        </div>
        <Button
          variant="outline"
          className="bg-[#0f0f0f] border-gray-700 text-white"
        >
          All Roles
        </Button>
        <Button
          variant="outline"
          className="bg-[#0f0f0f] border-gray-700 text-white"
        >
          All Status
        </Button>
        <Button
          variant="outline"
          className="bg-[#0f0f0f] border-gray-700 text-white"
        >
          <Filter className="w-4 h-4 mr-2" />
          Advanced Filters
        </Button>
      </div>

      {/* User Accounts Table */}
      <Card className="bg-[#0f0f0f] border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">User Accounts</CardTitle>
            <p className="text-sm text-gray-400">Showing 1-10 of 247 users</p>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="w-8">
                  <input type="checkbox" className="rounded" />
                </TableHead>
                <TableHead className="text-gray-400">USER & ID</TableHead>
                <TableHead className="text-gray-400">PHONE & EMAIL</TableHead>
                <TableHead className="text-gray-400">ROLE & STATUS</TableHead>
                <TableHead className="text-gray-400">
                  LAST ACTIVE & IP
                </TableHead>
                <TableHead className="text-gray-400">PERMISSIONS</TableHead>
                <TableHead className="text-gray-400">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-gray-800 hover:bg-gray-800/50"
                >
                  <TableCell>
                    <input type="checkbox" className="rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-[#FF9933]/20 text-[#FF9933] text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div
                          className="text-white text-sm"
                          style={{ fontWeight: 600 }}
                        >
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500">{user.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-300">{user.email}</div>
                    <div className="text-xs text-gray-500">{user.phone}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <Badge
                        variant="outline"
                        className={
                          user.roleColor === "blue"
                            ? "bg-blue-500/20 text-blue-400 border-blue-500/30 w-fit"
                            : user.roleColor === "green"
                            ? "bg-green-500/20 text-green-400 border-green-500/30 w-fit"
                            : user.roleColor === "orange"
                            ? "bg-orange-500/20 text-orange-400 border-orange-500/30 w-fit"
                            : "bg-gray-500/20 text-gray-400 border-gray-500/30 w-fit"
                        }
                      >
                        {user.role}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          user.statusColor === "green"
                            ? "bg-green-500/20 text-green-400 border-green-500/30 w-fit"
                            : user.statusColor === "yellow"
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 w-fit"
                            : "bg-red-500/20 text-red-400 border-red-500/30 w-fit"
                        }
                      >
                        {user.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-300">
                      {user.lastActive}
                    </div>
                    <div className="text-xs text-gray-500">{user.ip}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {user.permissions.map((perm) => (
                        <Badge
                          key={perm}
                          variant="outline"
                          className={
                            perm === "Edit"
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : perm === "Delete"
                              ? "bg-red-500/20 text-red-400 border-red-500/30"
                              : perm === "None"
                              ? "bg-gray-500/20 text-gray-400 border-gray-500/30"
                              : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                          }
                        >
                          {perm}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-white"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-white"
                      >
                        <Lock className="w-4 h-4" />
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
                Showing 1-10 of 247 results
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
                  25
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

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-500">0 users selected</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30"
              >
                Bulk Actions Disabled
              </Button>
              <Button
                variant="outline"
                className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
              >
                Suspend All Users
              </Button>
              <Button
                variant="outline"
                className="bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
              >
                Deactivate All Users
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent User Activity */}
        <Card className="bg-[#0f0f0f] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent User Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#FF9933]/20 text-[#FF9933] text-xs">
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-white">
                    <span style={{ fontWeight: 600 }}>{activity.user}</span>{" "}
                    <span className="text-gray-400">{activity.action}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button
              variant="link"
              className="text-[#FF9933] hover:text-[#ff8800] p-0 h-auto"
            >
              View all activity
            </Button>
          </CardContent>
        </Card>

        {/* Security Alerts */}
        <Card className="bg-[#0f0f0f] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Security Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {securityAlerts.map((alert, index) => (
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
                <div className="flex items-start gap-3">
                  {alert.severity === "critical" ? (
                    <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  ) : alert.severity === "warning" ? (
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4
                      className={`text-sm mb-1 ${
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
                    <p className="text-xs text-gray-400">{alert.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="link"
              className="text-[#FF9933] hover:text-[#ff8800] p-0 h-auto"
            >
              View security dashboard
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Role Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#0f0f0f] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">
              Role Distribution & Permissions Overview
            </CardTitle>
            <CardDescription>User Role Distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={roleDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {roleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="flex-1 space-y-4">
                {roleDistribution.map((role) => (
                  <div key={role.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: role.color }}
                        />
                        <span
                          className="text-sm text-white"
                          style={{ fontWeight: 600 }}
                        >
                          {role.name}
                        </span>
                      </div>
                      <span
                        className="text-sm text-white"
                        style={{ fontWeight: 700 }}
                      >
                        {role.value}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 ml-5">
                      {role.name === "Admin"
                        ? "Complete system access"
                        : role.name === "QA Manager"
                        ? "Inspection & report management"
                        : role.name === "ML Engineer"
                        ? "Model development & training"
                        : "Read-only access"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Health & Performance */}
        <div className="space-y-6">
          <Card className="bg-[#0f0f0f] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {systemHealth.map((system, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{system.name}</span>
                  <Badge
                    variant="outline"
                    className={
                      system.status === "Online" || system.status === "Active"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                    }
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                    {system.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-[#0f0f0f] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">{metric.name}</span>
                    <span
                      className="text-sm text-[#FF9933]"
                      style={{ fontWeight: 600 }}
                    >
                      {metric.value}%
                    </span>
                  </div>
                  <Progress value={metric.value} className="h-2 bg-gray-800" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-[#0f0f0f] border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="bg-[#FF9933] hover:bg-[#ff8800] text-black w-full">
            <UserPlus className="w-4 h-4 mr-2" />
            Add New User
          </Button>
          <Button
            variant="outline"
            className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 w-full"
          >
            Export User List
          </Button>
          <Button
            variant="outline"
            className="bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30 w-full"
          >
            Generate Report
          </Button>
          <Button
            variant="outline"
            className="bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30 w-full"
          >
            Bulk Email Users
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
