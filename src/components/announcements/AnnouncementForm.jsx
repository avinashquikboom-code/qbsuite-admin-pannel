'use client';
import { FontAwesomeIcon } from '@/components/icons/FontAwesomeIcon';
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { Textarea } from '@/components/common/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/common/Select';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
function AnnouncementFormFields({ open, onOpenChange, announcement, onSave, }) {
    const [title, setTitle] = React.useState(announcement?.title ?? '');
    const [content, setContent] = React.useState(announcement?.content ?? '');
    const [category, setCategory] = React.useState(announcement?.category ?? 'General');
    const [priority, setPriority] = React.useState(announcement?.priority ?? 'normal');
    const [targetAudience, setTargetAudience] = React.useState(announcement?.targetAudience ?? 'All Employees');
    const [isImportant, setIsImportant] = React.useState(announcement?.isImportant ?? false);
    const [isPublished, setIsPublished] = React.useState(announcement?.isPublished ?? true);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            title,
            content,
            category,
            priority,
            targetAudience,
            isImportant,
            isPublished,
        });
        onOpenChange(false);
    };
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-white border border-slate-200 shadow-xl rounded-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-900">
              {announcement ? 'Edit Announcement' : 'Create Company Announcement'}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Publish communications, company policies, holidays, or executive updates.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4 text-xs">
            <div className="space-y-1">
              <Label className="text-xs font-medium">Title *</Label>
              <Input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Q2 Corporate Summit & Roadmap All-Hands" className="h-8 text-xs"/>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-medium">Category</Label>
                <Select value={category} onValueChange={(val) => setCategory(val)}>
                  <SelectTrigger className="h-8 text-xs w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General" className="text-xs">
                      General
                    </SelectItem>
                    <SelectItem value="Policy" className="text-xs">
                      Policy
                    </SelectItem>
                    <SelectItem value="Holiday" className="text-xs">
                      Holiday
                    </SelectItem>
                    <SelectItem value="Event" className="text-xs">
                      Event
                    </SelectItem>
                    <SelectItem value="Urgent" className="text-xs">
                      Urgent
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-medium">Target Audience</Label>
                <Select value={targetAudience} onValueChange={(val) => setTargetAudience(val)}>
                  <SelectTrigger className="h-8 text-xs w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Employees" className="text-xs">
                      All Employees
                    </SelectItem>
                    <SelectItem value="Engineering" className="text-xs">
                      Engineering
                    </SelectItem>
                    <SelectItem value="Sales" className="text-xs">
                      Sales
                    </SelectItem>
                    <SelectItem value="Managers" className="text-xs">
                      Managers
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">Message Body *</Label>
              <Textarea required value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write the full announcement text..." rows={4} className="text-xs resize-none"/>
            </div>

            {/* Upload Mockup */}
            <div className="space-y-1">
              <Label className="text-xs font-medium">Attachments (Optional)</Label>
              <div className="rounded-lg border border-dashed border-slate-200 p-3 bg-slate-50/60 text-center hover:bg-slate-50 cursor-pointer">
                <FontAwesomeIcon icon={faCloudArrowUp} className="size-6 text-slate-400 mx-auto"/>
                <p className="text-[11px] text-slate-600 mt-1">
                  Drag & drop PDF, guidelines, or matrix here, or{' '}
                  <span className="text-brand font-semibold">browse files</span>
                </p>
                <p className="text-[10px] text-slate-400">PDF, PNG, JPG up to 10MB</p>
              </div>
            </div>

            {/* Toggles */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={isImportant} onChange={(e) => setIsImportant(e.target.checked)} className="rounded border-slate-300 text-brand focus:ring-brand"/>
                <span className="text-xs font-semibold text-slate-800">
                  Mark as High Priority
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="rounded border-slate-300 text-brand focus:ring-brand"/>
                <span className="text-xs font-semibold text-slate-800">
                  Publish Immediately
                </span>
              </label>
            </div>
          </div>

          <DialogFooter className="border-t border-slate-100 pt-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="h-8 text-xs">
              Cancel
            </Button>
            <Button type="submit" className="h-8 bg-brand hover:bg-brand-dark text-primary-foreground text-xs font-semibold">
              {announcement ? 'Save Changes' : 'Publish Announcement'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>);
}

export function AnnouncementForm(props) { return <AnnouncementFormFields key={(props.announcement?.id || "new") + String(props.open)} {...props} />; }
