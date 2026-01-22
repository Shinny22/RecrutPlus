
//version 2


"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  FileText,
  Settings,
  LogOut,
  Briefcase,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  BellRing,
  Edit3,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";

/* ============================
   IMPORTANT: shadcn UI imports
   (adapte si tu n'utilises pas shadcn)
   ============================ */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import OffresList from "./OffreList";
import LogoutButton from "./Logoutbtn";


/* ----------------------------
   Types
   ---------------------------- */
interface Candidature {
  id_dde: number;
  date_depot: string;
  etat: string;
  reponse?: string | null;
  campagne?: {
    code?: string;
    description?: string;
    etat?: string;
  } | null;
}

interface Candidat {
  id?: number;
  nom_cand?: string;
  pren_cand?: string;
  email?: string;
  photo?: string;
  diplome?: any;
  cv?: string;
  telephone1?: string;
  lieu_nais?: string;
  dat_nais?: string;
  genre?: string;
  sitmat?: string;
}

/* ----------------------------
   Helpers
   ---------------------------- */
const prettyDate = (d?: string) => {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleDateString();
  } catch {
    return d;
  }
};

const statusVariant = (s?: string) => {
  const st = (s || "").toLowerCase();
  if (st.includes("accept")) return { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" };
  if (st.includes("en cours") || st.includes("processing") || st.includes("pending")) return { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" };
  if (st.includes("refus") || st.includes("reject") || st.includes("refused")) return { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" };
  return { bg: "bg-slate-50", text: "text-slate-700", dot: "bg-slate-400" };
};

/* ----------------------------
   Component
   ---------------------------- */
export default function CandidateDashboardPremium() {
  const [tab, setTab] = useState<"dashboard" | "candidatures" | "offres" | "profil" | "settings">("dashboard");
  const [user, setUser] = useState<Candidat | null>(null);
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // CHANGE THIS to your API base
  const apiBase = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";

  const fetchData = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setError("Vous n'êtes pas connecté.");
        setUser(null);
        setCandidatures([]);
        setLoading(false);
        return;
      }

      const [profileRes, candRes] = await Promise.all([
        fetch(`${apiBase}/api/candidat/profile/`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${apiBase}/candidat/candidatures/`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (!profileRes.ok) throw new Error("Profil non disponible");
      if (!candRes.ok) throw new Error("Impossible de charger vos candidatures");

      const profile = await profileRes.json();
      const candData = await candRes.json();

      setUser(profile);
      setCandidatures(candData?.demandes ?? candData ?? []);
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Une erreur est survenue.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [apiBase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* -------------- Derived metrics -------------- */
  const stats = useMemo(() => {
    const total = candidatures.length;
    const inProgress = candidatures.filter((c) => (c.etat || "").toLowerCase().includes("en cours") || (c.etat || "").toLowerCase().includes("pending")).length;
    const accepted = candidatures.filter((c) => (c.etat || "").toLowerCase().includes("accept")).length;
    const rejected = candidatures.filter((c) => (c.etat || "").toLowerCase().includes("refus") || (c.etat || "").toLowerCase().includes("reject")).length;
    return { total, inProgress, accepted, rejected };
  }, [candidatures]);


  /* -------------- UI pieces -------------- */
  const SidebarItem: React.FC<{ id: typeof tab; label: string; icon: JSX.Element; badge?: number }> = ({ id, label, icon, badge }) => {
    const active = tab === id;
    return (
      <motion.button
        onClick={() => setTab(id)}
        initial={false}
        animate={active ? { scale: 1.02 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          active ? "bg-[linear-gradient(90deg,#ECFDF5_0%,#E6F9F0_100%)] text-green-800 shadow" : "text-slate-700 hover:bg-slate-50"
        }`}
      >
        <div className="w-6 h-6 flex items-center justify-center text-slate-600">{icon}</div>
        <span className="flex-1 text-left">{label}</span>
        {badge ? <div className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">{badge}</div> : null}
      </motion.button>
    );
  };

  /* -------------- Empty / loading UI -------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white p-6">
        <div className="w-full max-w-4xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                <RefreshCw className="text-white animate-spin" size={22} />
              </div>
              <div>
                <div className="h-4 w-56 bg-slate-100 rounded-md animate-pulse" />
                <div className="h-3 w-40 bg-slate-100 rounded-md mt-2 animate-pulse" />
              </div>
            </div>
            <div className="h-10 w-32 bg-slate-100 rounded-md animate-pulse" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white shadow border animate-pulse h-28" />
            ))}
          </div>

          <div className="p-6 bg-white rounded-xl shadow border animate-pulse h-64" />
        </div>
      </div>
    );
  }

  /* -------------- Main render -------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-[1400px] mx-auto p-6 lg:p-10">
        {/* Top header */}
        <header className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {/* company logo */}
              <div className="w-30 h-12 rounded-lg bg-gradient-to-tr from-green-600 to-emerald-400 flex items-center justify-center shadow-md">
                {/* short logo text/icon */}
                <span className="text-white font-bold">CFI-Recrute</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Mon espace candidat</h3>
                {/* <p className="text-xs text-slate-500">Vue personnalisée — identité : <strong className="text-slate-700">CFI</strong></p> */}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={fetchData} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border hover:shadow">
                    <RefreshCw size={16} /> Rafraîchir
                  </button>
                </TooltipTrigger>
                <TooltipContent>Récupère les dernières données</TooltipContent>
              </Tooltip>

              <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white shadow">
                <CheckCircle size={16} /> Postuler
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-md bg-white border hover:shadow">
                <BellRing size={18} />
              </button>

              {/* user avatar */}
              <div className="flex items-center gap-2 bg-white border rounded-lg p-1">
                <Avatar className="w-10 h-10">
                  {user?.photo ? (
                    <AvatarImage src={`http://127.0.0.1:8000/${user.photo}`} alt={`${user.nom_cand} ${user.pren_cand}`} />
                  ) : (
                    <AvatarFallback>{(user?.nom_cand?.[0] ?? "C") + (user?.pren_cand?.[0] ?? "")}</AvatarFallback>
                  )}
                </Avatar>
                <div className="hidden sm:block text-sm">
                  <div className="font-medium">{user?.nom_cand ?? "Candidat"}</div>
                  <div className="text-xs text-slate-500">{user?.email ?? "—"}</div>
                </div>
                <div className="hidden sm:block pl-2 border-l border-slate-100 ml-2">
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-15 h-15">
                      {user?.photo ? <AvatarImage src={`http://127.0.0.1:8000/${user.photo}`} alt="avatar" /> : <AvatarFallback>{(user?.nom_cand?.[0] ?? "C")}</AvatarFallback>}
                    </Avatar>
                    <div>
                      <div className="text-sm font-semibold">{user?.nom_cand} {user?.pren_cand}</div>
                      <div className="text-xs text-slate-500">{user?.email}</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400">CFI</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <SidebarItem id="dashboard" label="Tableau de bord" icon={<Briefcase size={16} />} />
                  <SidebarItem id="candidatures" label="Mes candidatures" icon={<FileText size={16} />} badge={stats.inProgress} />
                  <SidebarItem id="offres" label="Voir offres" icon={<FileText size={16} />} />
              
                  <SidebarItem id="profil" label="Mon profil" icon={<User size={16} />} />
                  <SidebarItem id="settings" label="Paramètres" icon={<Settings size={16} />} />
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="text-xs text-slate-500">Actions rapides</div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="w-full" onClick={() => setTab("candidatures")}>
                      <FileText size={14} /> Voir candidatures
                    </Button>
                    <Button variant="ghost" className="w-full" onClick={() => setTab("profil")}>
                      <Edit3 size={14} /> Éditer profil
                    </Button>
                    <Button variant="destructive" className="w-full" onClick={() => { localStorage.removeItem("token"); window.location.href = "/Login"; }}>
                      <LogOut size={14} /> Déconnexion
                    </Button>
                      {/* <LogoutButton /> */}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Branding card */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-6">
              <Card>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-emerald-400 to-green-600 flex items-center justify-center text-white font-semibold shadow">
                      C
                    </div>
                    <div>
                      <div className="text-sm font-semibold">CFI- Recrute</div>
                      <div className="text-xs text-slate-500">Bienvenue sur votre espace candidats</div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">Utilise cette vue pour suivre tes candidatures, télécharger tes documents et gérer ton profil.</p>
                </CardContent>
              </Card>
            </motion.div>
          </aside>

          {/* Main content */}
          <section className="lg:col-span-9 space-y-6">
            {tab === "dashboard" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-xs text-slate-500">Candidatures totales</div>
                              <div className="text-2xl font-bold text-green-700">{stats.total}</div>
                            </div>
                            <div className="p-2 rounded-md bg-emerald-50">
                              <Briefcase size={20} className="text-emerald-600" />
                            </div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-slate-500">Dernières 30 jours — Aperçu</div>
                        <div className="mt-3 flex items-center gap-3">
                          <Button variant="ghost" onClick={() => setTab("candidatures")}>Voir</Button>
                          <Button onClick={() => alert("Export CSV")}>Exporter</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-xs text-slate-500">En cours</div>
                              <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
                            </div>
                            <div className="p-2 rounded-md bg-yellow-50">
                              <Clock size={20} className="text-yellow-600" />
                            </div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-slate-500">Suivre le traitement des candidatures</div>
                        <div className="mt-3 flex items-center gap-3">
                          <Button variant="outline" onClick={() => setTab("candidatures")}>Détails</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-xs text-slate-500">Acceptées</div>
                              <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
                            </div>
                            <div className="p-2 rounded-md bg-emerald-50">
                              <CheckCircle size={20} className="text-emerald-600" />
                            </div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-slate-500">Offres acceptées</div>
                        <div className="mt-3">
                          <Button onClick={() => alert("Voir offres acceptées")}>Voir</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Recent applications list */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold">Candidatures récentes</h4>
                        <p className="text-xs text-slate-500">Les dernières candidatures déposées</p>
                      </div>
                      <div className="text-xs text-slate-400">Total: {stats.total}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {candidatures.length === 0 ? (
                      <div className="text-sm text-slate-500">Aucune candidature trouvée.</div>
                    ) : (
                      <div className="grid gap-3">
                        {candidatures.slice(0, 6).map((c) => {
                          const variant = statusVariant(c.etat);
                          return (
                            <motion.article key={c.id_dde} whileHover={{ y: -4 }} className="flex items-center justify-between p-4 bg-white rounded-lg border shadow-sm">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-md bg-slate-50 flex items-center justify-center">
                                  <FileText size={18} className="text-slate-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-slate-800">{c.campagne?.description ?? "Offre"}</div>
                                  <div className="text-xs text-slate-500">{c.campagne?.code ?? ""} • Déposé: {prettyDate(c.date_depot)}</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${variant.bg} ${variant.text}`}>
                                  <span className={`w-2 h-2 rounded-full ${variant.dot}`} />
                                  <span>{c.etat ?? "—"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button onClick={() => alert("Voir détail")} className="text-xs text-emerald-600">Voir</button>
                                  <button onClick={() => alert("Télécharger")} className="text-xs text-slate-500"><Download size={14} /></button>
                                </div>
                              </div>
                            </motion.article>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}

            {tab === "candidatures" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold">Toutes mes candidatures</h4>
                      <p className="text-xs text-slate-500">Historique complet</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Rechercher par entreprise, campagne..." />
                      <Button onClick={() => alert("Filtrer")}>Filtrer</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="text-xs text-slate-500 text-left">
                        <tr>
                          <th className="py-3">Offre</th>
                          <th className="py-3">Date dépôt</th>
                          <th className="py-3">Statut</th>
                          <th className="py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {candidatures.map((c) => {
                          const v = statusVariant(c.etat);
                          return (
                            <tr key={c.id_dde} className="border-t">
                              <td className="py-3">
                                <div className="font-medium">{c.campagne?.description ?? "Offre"}</div>
                                <div className="text-xs text-slate-500">{c.campagne?.code}</div>
                              </td>
                              <td className="py-3">{prettyDate(c.date_depot)}</td>
                              <td className="py-3">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${v.bg} ${v.text}`}>
                                  <span className={`w-2 h-2 rounded-full ${v.dot}`} />
                                  <span>{c.etat}</span>
                                </div>
                              </td>
                              <td className="py-3">
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => alert("Voir détail")}>Voir</Button>
                                  <Button variant="outline" size="sm" onClick={() => alert("Télécharger")}>Docs</Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
           {tab === "offres" && <OffresList />}

            {tab === "profil" && user && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold">Mon profil</h4>
                      <p className="text-xs text-slate-500">Gérer tes informations personnelles</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={() => alert("Télécharger CV")}>Télécharger CV</Button>
                      <Button onClick={() => alert("Éditer profil")}>Éditer</Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-30 h-30 rounded-full overflow-hidden ring-2 ring-emerald-100">
                      <Image src={`http://127.0.0.1:8000/${user.photo}` ?? "/images/default_user.png"} alt="avatar" fill className="object-cover" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">{user.nom_cand} {user.pren_cand}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                    <div className="flex gap-2">
                      {user.cv && <a href={user.cv} target="_blank" rel="noreferrer"><Button variant="outline"><Download size={14} /> CV</Button></a>}
                      <Button variant="ghost" onClick={() => alert("Changer photo")}>Changer</Button>
                    </div>
                  </div>

                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="text-xs text-slate-500">Téléphone</div>
                      <div className="font-medium">{user.telephone1 ?? "—"}</div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="text-xs text-slate-500">Ville</div>
                      <div className="font-medium">{user.lieu_nais ?? "—"}</div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="text-xs text-slate-500">Date de naissance</div>
                      <div className="font-medium">{user.dat_nais ?? "—"}</div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="text-xs text-slate-500">Genre</div>
                      <div className="font-medium">{user.genre ?? "—"}</div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="text-xs text-slate-500">Situation</div>
                      <div className="font-medium">{user.sitmat ?? "—"}</div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="text-xs text-slate-500">Diplôme</div>
                      <div className="font-medium">{user?.diplome?.designation ?? user?.diplome ?? "—"}</div>
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <Separator />
                    <div className="mt-4 flex flex-col md:flex-row gap-3 items-start md:items-center">
                      <Button onClick={() => alert("Modifier profil")}>Modifier le profil</Button>
                      <Button variant="outline" onClick={() => alert("Changer mot de passe")}>Changer mot de passe</Button>
                      <Button variant="ghost" onClick={() => alert("Supprimer compte")}>Supprimer le compte</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {tab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">Notifications</div>
                          <div className="text-xs text-slate-500">Recevoir des notifications par e-mail et SMS</div>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">Langue</div>
                          <div className="text-xs text-slate-500">Choisir la langue de l'interface</div>
                        </div>
                        <div>
                          <select className="bg-white border px-3 py-1 rounded-md text-sm">
                            <option>Français</option>
                            <option>English</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="text-sm font-medium">Apparence</div>
                      <div className="text-xs text-slate-500">Personnaliser le thème</div>
                      <div className="mt-3 flex items-center gap-3">
                        <button className="w-8 h-8 rounded-md bg-white border" />
                        <button className="w-8 h-8 rounded-md bg-gradient-to-tr from-emerald-400 to-green-600" />
                        <button className="w-8 h-8 rounded-md bg-gradient-to-tr from-indigo-400 to-purple-600" />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <div className="text-sm font-medium">Sécurité</div>
                      <div className="text-xs text-slate-500">Vérifications & sessions</div>
                      <div className="mt-3">
                        <Button variant="outline" onClick={() => alert("Historique des sessions")}>Voir sessions</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
