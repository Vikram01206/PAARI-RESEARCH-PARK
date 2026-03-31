import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

type Event = Tables<"events">;

const emptyEvent: Omit<TablesInsert<"events">, "id"> = {
  title: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  time: "",
  location: "",
  type: "Conference",
  is_featured: false,
  is_popup: false,
  image_url: "",
};

export function AdminEvents() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [form, setForm] = useState(emptyEvent);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (event: typeof form & { id?: string }) => {
      if (event.id) {
        const { error } = await supabase.from("events").update(event).eq("id", event.id);
        if (error) throw error;
      } else {
        // If this event is set as popup, clear others first
        if (event.is_popup) {
          await supabase.from("events").update({ is_popup: false }).eq("is_popup", true);
        }
        const { error } = await supabase.from("events").insert(event);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["popup-event"] });
      toast.success(editingEvent ? "Event updated!" : "Event created!");
      closeDialog();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["popup-event"] });
      toast.success("Event deleted!");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const openCreate = () => {
    setEditingEvent(null);
    setForm(emptyEvent);
    setDialogOpen(true);
  };

  const openEdit = (event: Event) => {
    setEditingEvent(event);
    setForm({
      title: event.title,
      description: event.description || "",
      date: event.date,
      time: event.time || "",
      location: event.location || "",
      type: event.type,
      is_featured: event.is_featured || false,
      is_popup: event.is_popup || false,
      image_url: event.image_url || "",
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingEvent(null);
    setForm(emptyEvent);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(editingEvent ? { ...form, id: editingEvent.id } : form);
  };

  const eventTypes = ["Conference", "Workshop", "Webinar", "Bootcamp", "Seminar"];

  if (isLoading) return <div className="text-muted-foreground">Loading events...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground">Events & Calendar</h2>
          <p className="text-sm text-muted-foreground">Manage events. Mark one as "Show as Popup" to display it on the homepage.</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="skeu-card p-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-primary/10 text-primary">
                  {event.type}
                </span>
                {event.is_popup && (
                  <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-accent/20 text-accent">
                    Homepage Popup
                  </span>
                )}
                {event.is_featured && (
                  <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-green-500/20 text-green-700">
                    Featured
                  </span>
                )}
              </div>
              <h4 className="font-semibold text-foreground truncate">{event.title}</h4>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                {event.location && <span>📍 {event.location}</span>}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={() => openEdit(event)}>
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => {
                  if (confirm("Delete this event?")) deleteMutation.mutate(event.id);
                }}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No events yet. Click "Add Event" to create one.
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input value={form.time || ""} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="9:00 AM – 5:00 PM" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={form.location || ""} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Chennai, India" />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <select
                  className="w-full skeu-input text-sm"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  {eventTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Image URL (optional)</Label>
              <Input value={form.image_url || ""} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={!!form.is_featured} onCheckedChange={(v) => setForm({ ...form, is_featured: v })} />
                <Label className="cursor-pointer">Featured</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={!!form.is_popup} onCheckedChange={(v) => setForm({ ...form, is_popup: v })} />
                <Label className="cursor-pointer">Show as Homepage Popup</Label>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" className="flex-1" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : editingEvent ? "Update" : "Create"}
              </Button>
              <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
