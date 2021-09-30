import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import GerenciamentoProjetos from "views/Projetos/gerenciamentoProjetos.js";
import GerenciamentoProfessores from "views/Professores/gerenciamentoProfessores.js";
import GerenciamentoAlunos from "views/Alunos/gerenciamentoAlunos.js";
import GerenciamentoEnderecos from "views/Enderecos/gerenciamentoEnderecos.js";

const dashboardRoutes = [
  /*
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },*/
  {
    path: "/alunos",
    name: "Gerenciamento de Alunos",
    rtlName: "Alunos",
    icon: Person,
    component: GerenciamentoAlunos,
    layout: "/admin"
  },
  {
    path: "/Professores",
    name: "Gerenciamento de Professores",
    rtlName: "Professores",
    icon: Person,
    component: GerenciamentoProfessores,
    layout: "/admin"
  },
  {
    path: "/projetos",
    name: "Gerenciamento de Projetos",
    rtlName: "Projetos",
    icon: LibraryBooks,
    component: GerenciamentoProjetos,
    layout: "/admin"
  },
  {
    path: "/endereco",
    name: "Gerenciamento de Endereço",
    rtlName: "Enderecos",
    icon: Dashboard,
    component: GerenciamentoEnderecos,
    layout: "/admin"
  }
  /*
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  }*/,
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
