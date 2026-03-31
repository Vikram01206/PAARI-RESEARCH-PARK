import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type GalleryItem = Tables<"gallery">;

export function AdminGallery() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState({ title: "", category: "General", description: "", image_url: "", sort_order: 0 });
  const [uploading, setUploading] = useState(false);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gallery").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (item: typeof form & { id?: string }) => {
      if (item.id) {
        const { error } = await supabase.from("gallery").update(item).eq("id", item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("gallery").insert(item);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast.success(editing ? "Updated!" : "Added!");
      closeDialog();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (item: GalleryItem) => {
      // 1. Delete image file from storage if it's hosted in our bucket
      if (item.image_url && item.image_url.includes("/storage/v1/object/public/gallery/")) {
        const path = item.image_url.split("/storage/v1/object/public/gallery/")[1];
        if (path) {
          await supabase.storage.from("gallery").remove([path]);
        }
      }

      // 2. Delete the record from the database
      const { error } = await supabase.from("gallery").delete().eq("id", item.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Deleted!");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("gallery").upload(path, file);
    if (error) {
      toast.error("Upload failed: " + error.message);
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(path);
    setForm({ ...form, image_url: urlData.publicUrl });
    setUploading(false);
    toast.success("Image uploaded!");
  };

  const openCreate = () => { setEditing(null); setForm({ title: "", category: "General", description: "", image_url: "", sort_order: 0 }); setDialogOpen(true); };
  const openEdit = (item: GalleryItem) => {
    setEditing(item);
    setForm({ title: item.title, category: item.category, description: item.description || "", image_url: item.image_url, sort_order: item.sort_order || 0 });
    setDialogOpen(true);
  };
  const closeDialog = () => { setDialogOpen(false); setEditing(null); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image_url) { toast.error("Please upload or provide an image URL"); return; }
    saveMutation.mutate(editing ? { ...form, id: editing.id } : form);
  };

  const categories = ["General", "Seminars", "Workshops", "Conferences", "Projects", "Campus"];

  if (isLoading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground">Gallery</h2>
          <p className="text-sm text-muted-foreground">Upload and manage photos for the gallery page.</p>
        </div>
        <Button onClick={openCreate}><Plus className="h-4 w-4" /> Add Image</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="skeu-card overflow-hidden group">
            <div className="aspect-square bg-secondary">
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <span className="text-xs font-medium text-primary">{item.category}</span>
              <h4 className="text-sm font-semibold text-foreground truncate">{item.title}</h4>
              <div className="flex gap-1 mt-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(item)}><Pencil className="h-3 w-3" /></Button>
                <Button variant="outline" size="sm" className="text-destructive" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(item); }}><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="col-span-full text-center py-12 text-muted-foreground">No images yet.</div>}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? "Edit Image" : "Add Image"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <select className="w-full skeu-input text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Sort Order</Label>
                <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Image</Label>
              <div className="flex gap-2">
                <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="URL or upload" className="flex-1" />
                <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => document.getElementById("gallery-upload")?.click()}>
                  <Upload className="h-4 w-4" />
                  {uploading ? "..." : "Upload"}
                </Button>
                <input id="gallery-upload" type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleFileUpload(e.target.files[0]); }} />
              </div>
              {form.image_url && <img src={form.image_url} alt="Preview" className="h-32 w-full object-cover rounded-lg mt-2" />}
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" className="flex-1" disabled={saveMutation.isPending}>{saveMutation.isPending ? "Saving..." : editing ? "Update" : "Add"}</Button>
              <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
