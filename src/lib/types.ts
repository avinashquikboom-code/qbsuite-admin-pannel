export type EmployeeStatus = 'active' | 'inactive' | 'on_leave'

export type Department =
  | 'Engineering'
  | 'Product & Design'
  | 'Human Resources'
  | 'Finance'
  | 'Sales'
  | 'Marketing'
  | 'Operations'

export interface Employee {
  id: string
  firstName: string
  lastName: string
  name: string
  avatar: string
  email: string
  phone: string
  department: Department
  designation: string
  status: EmployeeStatus
  joinDate: string
  employmentType: 'Full-Time' | 'Part-Time' | 'Contract'
  location: string
  salary: {
    basic: number
    allowances: number
    hourlyRate: number
    currency: string
  }
  bankDetails: {
    accountName: string
    accountNumber: string
    bankName: string
    routingNumber: string
  }
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'half_day' | 'on_leave'

export interface AttendanceRecord {
  id: string
  employeeId: string
  employeeName: string
  employeeAvatar: string
  department: Department
  date: string
  punchIn: string | null
  punchOut: string | null
  breakDuration: string
  workingHours: string
  lateDuration: string | null
  status: AttendanceStatus
}

export type OvertimeStatus = 'pending' | 'approved' | 'rejected'

export interface OvertimeRequest {
  id: string
  employeeId: string
  employeeName: string
  employeeAvatar: string
  department: Department
  date: string
  hours: number
  rateMultiplier: number
  hourlyRate: number
  estimatedAmount: number
  reason: string
  project: string
  status: OvertimeStatus
  appliedOn: string
  reviewedBy?: string
  reviewDate?: string
  reviewNote?: string
}

export type ExpenseCategory =
  | 'Travel'
  | 'Meals & Entertainment'
  | 'Equipment & Hardware'
  | 'Office Supplies'
  | 'Software / Subscriptions'
  | 'Training & Education'

export type ExpenseStatus = 'pending' | 'approved' | 'rejected'

export interface ExpenseClaim {
  id: string
  employeeId: string
  employeeName: string
  employeeAvatar: string
  department: Department
  category: ExpenseCategory
  amount: number
  currency: string
  date: string
  description: string
  receiptUrl: string
  receiptName: string
  status: ExpenseStatus
  submittedDate: string
  reviewedBy?: string
  reviewDate?: string
  reviewNote?: string
}

export type PayrollStatus = 'paid' | 'pending' | 'processing'

export interface PayrollRecord {
  id: string
  employeeId: string
  employeeName: string
  employeeAvatar: string
  department: Department
  designation: string
  month: string
  basicSalary: number
  allowances: number
  overtimePay: number
  reimbursements: number
  grossPay: number
  deductions: {
    tax: number
    insurance: number
    providentFund: number
    other: number
  }
  totalDeductions: number
  netPay: number
  status: PayrollStatus
  paymentDate?: string
  bankAccount: string
}

export type AnnouncementCategory = 'General' | 'Policy' | 'Holiday' | 'Event' | 'Urgent'
export type AnnouncementPriority = 'low' | 'normal' | 'high'

export interface Announcement {
  id: string
  title: string
  content: string
  category: AnnouncementCategory
  priority: AnnouncementPriority
  isPublished: boolean
  isImportant: boolean
  author: {
    name: string
    role: string
    avatar: string
  }
  createdAt: string
  targetAudience: 'All Employees' | 'Engineering' | 'Sales' | 'Managers'
  attachments?: {
    id: string
    name: string
    size: string
    url: string
  }[]
}

export interface KpiData {
  totalEmployees: number
  totalEmployeesChange: string
  presentToday: number
  presentPercentage: number
  absentToday: number
  lateToday: number
  onLeaveToday: number
  pendingOvertime: number
  pendingExpenses: number
  pendingExpensesAmount: number
  monthlyPayroll: number
  monthlyPayrollChange: string
}

export interface AttendanceTrendDay {
  day: string
  date: string
  present: number
  late: number
  absent: number
  onLeave: number
}

// ----------------------------------------------------
// CRM MODULE TYPES
// ----------------------------------------------------

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'lost' | 'converted'
export type LeadSource = 'Website' | 'LinkedIn' | 'Referral' | 'Outbound' | 'Event' | 'Partner'

export interface Lead {
  id: string
  name: string
  title: string
  company: string
  email: string
  phone: string
  value: number
  source: LeadSource
  status: LeadStatus
  assignedTo: string
  createdAt: string
  notes?: string
}

export interface Contact {
  id: string
  name: string
  avatar: string
  company: string
  email: string
  phone: string
  role: string
  dealsCount: number
  totalRevenue: number
  status: 'active' | 'inactive'
  location: string
  lastContacted: string
}

export type DealStage = 'discovery' | 'proposal' | 'negotiation' | 'won' | 'closed_lost'

export interface Deal {
  id: string
  title: string
  company: string
  contactName: string
  contactEmail: string
  value: number
  stage: DealStage
  probability: number
  closingDate: string
  owner: string
  createdAt: string
}

export type InvoiceStatus = 'paid' | 'pending' | 'overdue'

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Invoice {
  id: string
  invoiceNumber: string
  clientName: string
  clientCompany: string
  clientEmail: string
  issueDate: string
  dueDate: string
  subtotal: number
  tax: number
  total: number
  status: InvoiceStatus
  items: InvoiceItem[]
  paidDate?: string
}

export interface CrmKpiData {
  totalRevenue: number
  revenueGrowth: string
  activeDealsCount: number
  pipelineValue: number
  leadsCount: number
  leadConversionRate: number
  pendingInvoicesAmount: number
  winRate: number
}

export interface PipelineStageMetric {
  stage: string
  count: number
  value: number
}

export type ActiveModule = 'suite' | 'hrm' | 'crm'
