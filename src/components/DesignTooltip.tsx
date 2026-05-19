import React, { useState, useRef } from 'react';
import { Edit, Save, X } from 'lucide-react';

interface DesignSpec {
  whatName: string;
  whatType: string;
  whatSource: string;
  styleSort: string;
  styleFormat: string;
  valueView: string;
  valueAdd: string;
  howEvents: string;
  howActions: string;
  whenVisible: string;
  whenEnabled: string;
}

const DEFAULT_SPEC: DesignSpec = {
  whatName: 'Tên control',
  whatType: 'Loại control',
  whatSource: 'Không có nguồn',
  styleSort: 'Mặc định',
  styleFormat: 'Mặc định',
  valueView: 'Giá trị mặc định',
  valueAdd: 'Giá trị trống',
  howEvents: 'Không có',
  howActions: 'Không có',
  whenVisible: 'Luôn hiện',
  whenEnabled: 'Luôn thao tác được'
};

export const DesignTooltip: React.FC<{ children: React.ReactNode, id: string }> = ({ children, id }) => {
  return <>{children}</>;
};
