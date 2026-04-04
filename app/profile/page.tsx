"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserCircle, Mail, Phone, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { useUser } from "@/lib/user-context";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: "+91 98765 43210", // Default placeholders for demo
    location: "Mumbai, India",
    dob: "1995-08-14"
  });
  const [isSaving, setIsSaving] = useState(false);

  // Sync with context if user info loads asynchronously
  useEffect(() => {
    if (user.isLoggedIn) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user.isLoggedIn, user.name, user.email]);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API delay
    setTimeout(() => {
      setUser({
        ...user,
        name: formData.name,
        email: formData.email
      });
      setIsSaving(false);
      toast.success("Profile updated successfully");
    }, 800);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-xs text-muted-foreground font-medium mt-1">Manage your identity and personal preferences across MunshiJi.</p>
      </div>

      {/* Avatar Card */}
      <Card className="border-none shadow-sm bg-slate-50 dark:bg-slate-900/50">
        <CardContent className="flex items-center gap-6 pt-6">
          <div className="h-20 w-20 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center shrink-0 shadow-inner">
            <UserCircle className="h-12 w-12 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="font-bold text-xl tracking-tight">{user.name || "Anonymous User"}</p>
            <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <Mail size={12} /> {user.email || "no-email@set.com"}
            </p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto font-bold text-[11px] h-8 px-4 rounded-full">Change Photo</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Info */}
        <Card className="shadow-sm border-border/60">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <UserCircle size={16} className="text-primary" /> Personal Information
            </CardTitle>
            <CardDescription className="text-xs">Update your legal name and contact details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Full Name</label>
              <Input 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="h-10 text-sm focus-visible:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-1.5"><Mail className="h-3 w-3" />Email Address</label>
              <Input 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                type="email" 
                className="h-10 text-sm focus-visible:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-1.5"><Phone className="h-3 w-3" />Phone Number</label>
              <Input 
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                type="tel" 
                className="h-10 text-sm focus-visible:ring-primary/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-1.5"><MapPin className="h-3 w-3" />Location</label>
                <Input 
                  value={formData.location} 
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="h-10 text-sm focus-visible:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-1.5"><Calendar className="h-3 w-3" />Date of Birth</label>
                <Input 
                  value={formData.dob} 
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  type="date" 
                  className="h-10 text-sm focus-visible:ring-primary/20"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                size="sm" 
                className="font-bold gap-2 px-6 rounded-lg"
              >
                {isSaving ? "Saving..." : "Save Changes"}
                {!isSaving && <CheckCircle2 size={14} />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card className="shadow-sm border-border/60">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-bold flex items-center gap-2">Security</CardTitle>
            <CardDescription className="text-xs">Manage your account protection.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Current Password</label>
              <Input type="password" placeholder="••••••••" className="h-10 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">New Password</label>
              <Input type="password" placeholder="••••••••" className="h-10 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Confirm New Password</label>
              <Input type="password" placeholder="••••••••" className="h-10 text-sm" />
            </div>
            <div className="flex justify-end pt-2">
              <Button size="sm" variant="outline" className="font-bold px-6 rounded-lg">Update Password</Button>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="shadow-sm border-border/60">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-bold flex items-center gap-2">Preferences</CardTitle>
            <CardDescription className="text-xs">Global settings for your dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Default Currency</label>
              <Input defaultValue="INR (₹)" className="h-10 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1">Language</label>
              <Input defaultValue="English (India)" className="h-10 text-sm" />
            </div>
            <div className="flex justify-end pt-2">
              <Button size="sm" variant="outline" className="font-bold px-6 rounded-lg">Save Preferences</Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-rose-200 dark:border-rose-900/50 bg-rose-50/10 dark:bg-rose-950/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-bold text-rose-600 dark:text-rose-400">Danger Zone</CardTitle>
            <CardDescription className="text-xs">Permanent actions for your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator className="opacity-40" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold">Deactivate Account</p>
                <p className="text-[10px] text-muted-foreground">Temporarily disable your profile.</p>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold text-rose-600 border-rose-200">Deactivate</Button>
            </div>
            <Separator className="opacity-40" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold">Delete Account</p>
                <p className="text-[10px] text-muted-foreground">Permanently wipe all financial history.</p>
              </div>
              <Button variant="destructive" size="sm" className="h-8 text-[10px] font-bold">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
