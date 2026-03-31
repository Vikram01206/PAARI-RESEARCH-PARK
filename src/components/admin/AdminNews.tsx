import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

type News = Tables<"news">;

const emptyNews: Omit<TablesInsert<"news">, "id"> = {
  title: "",
  content: "",
  summary: "",
  category: "Announcement",
  image_url: "",
  is_published: true,
};

export function AdminNews() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<News | null>(null);
  const [form, setForm] = useState(emptyNews);

  const { data: news = [], isLoading } = useQuery({
    queryKey: ["admin-news"],
    queryFn: async () => {
      const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (item: typeof form & { id?: string }) => {
      if (item.id) {
        const { error } = await supabase.from("news").update(item).eq("id", item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("news").insert(item);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast.success(editing ? "Updated!" : "Created!");
      closeDialog();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast.success("Deleted!");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const openCreate = () => { setEditing(null); setForm(emptyNews); setDialogOpen(true); };
  const openEdit = (item: News) => {
    setEditing(item);
    setForm({ title: item.title, content: item.content || "", summary: item.summary || "", category: item.category, image_url: item.image_url || "", is_published: item.is_published ?? true });
    setDialogOpen(true);
  };
  const closeDialog = () => { setDialogOpen(false); setEditing(null); setForm(emptyNews); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(editing ? { ...form, id: editing.id } : form);
  };

  const categories = ["Announcement", "Conference", "Workshop", "Webinar", "Bootcamp", "Seminar"];

  if (isLoading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground">News & Announcements</h2>
          <p className="text-sm text-muted-foreground">Manage news articles and announcements shown on the website.</p>
        </div>
        <Button onClick={openCreate}><Plus className="h-4 w-4" /> Add Article</Button>
      </div>

      <div className="space-y-3">
        {news.map((item) => (
          <div key={item.id} className="skeu-card p-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-primary/10 text-primary">{item.category}</span>
                {!item.is_published && <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">Draft</span>}
              </div>
              <h4 className="font-semibold text-foreground truncate">{item.title}</h4>
              {item.summary && <p className="text-xs text-muted-foreground mt-1 truncate">{item.summary}</p>}
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={() => openEdit(item)}><Pencil className="h-3.5 w-3.5" /></Button>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => { if (confirm("Delete?")) deleteMutation.mutate(item.id); }}><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        ))}
        {news.length === 0 && <div className="text-center py-12 text-muted-foreground">No articles yet.</div>}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit Article" : "Add Article"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
            <div className="space-y-2"><Label>Summary</Label><Input value={form.summary || ""} onChange={(e) => setForm({ ...form, summary: e.target.value })} placeholder="Brief summary..." /></div>
            <div className="space-y-2"><Label>Content</Label><Textarea value={form.content || ""} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={5} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <select className="w-full skeu-input text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2"><Label>Image URL</Label><Input value={form.image_url || ""} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." /></div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={!!form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} />
              <Label className="cursor-pointer">Published</Label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" className="flex-1" disabled={saveMutation.isPending}>{saveMutation.isPending ? "Saving..." : editing ? "Update" : "Create"}</Button>
              <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
