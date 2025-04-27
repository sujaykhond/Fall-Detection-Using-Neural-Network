
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Walking, BedDouble, AlertTriangle } from "lucide-react";
import type { MovementAnalysis as MovementAnalysisType } from '@/types/medical';

const MovementAnalysis = () => {
  // This will be replaced with your backend data
  const recentMovements: MovementAnalysisType[] = [
    {
      type: 'lying',
      status: 'warning',
      timestamp: '2024-04-27 14:30:00',
      duration: 180,
      details: 'Extended period of lying down detected'
    },
    {
      type: 'walking',
      status: 'alert',
      timestamp: '2024-04-27 13:15:00',
      details: 'Unusual gait pattern detected'
    },
    {
      type: 'posture',
      status: 'warning',
      timestamp: '2024-04-27 12:45:00',
      details: 'Slouching posture detected'
    }
  ];

  const getStatusColor = (status: MovementAnalysisType['status']) => {
    switch (status) {
      case 'alert':
        return 'text-red-500 bg-red-500/10';
      case 'warning':
        return 'text-yellow-500 bg-yellow-500/10';
      default:
        return 'text-green-500 bg-green-500/10';
    }
  };

  const getIcon = (type: MovementAnalysisType['type']) => {
    switch (type) {
      case 'lying':
        return <BedDouble className="h-5 w-5" />;
      case 'walking':
        return <Walking className="h-5 w-5" />;
      case 'posture':
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Movement Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentMovements.map((movement, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getIcon(movement.type)}
                    <span className="capitalize">{movement.type}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(movement.status)}`}>
                    {movement.status.toUpperCase()}
                  </span>
                </TableCell>
                <TableCell>{movement.timestamp}</TableCell>
                <TableCell>{movement.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MovementAnalysis;
