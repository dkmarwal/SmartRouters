import AdminConsole from "../views/AdminConsole";
import Dashboard from "../views/Dashboard";
import ticketsActive from "../assets/images/tickets_active.png";
import tickets from "../assets/images/tickets.png";
//import Reports from "../assets/images/reports.png";
import adminConsole from "../assets/images/admin_console.png";
import adminConsoleActive from "../assets/images/admin_console_active.png";
import Skills from "../views/AdminConsole/Skills";
//import AddSkill from "../views/AdminConsole/AddSkill";
import AddSkill from "../views/AdminConsole/Skills/AddSkill";
//import EditSkill from "../views/AdminConsole/EditSkill";
import EditSkill from "../views/AdminConsole/Skills/EditSkill";
import EditTeammember from "../views/AdminConsole/TeamMembers/EditTeammember"
import ProductSLA from "../views/AdminConsole/ProductSLA";
import AddSla from '../views/AdminConsole/ProductSLA/AddSla';
import EditSla from "../views/AdminConsole/ProductSLA/EditSla";
import CopySla from "../views/AdminConsole/ProductSLA/CopySla";
import PODMembers from "../views/AdminConsole/TeamMembers";
import AddMember from "../views/AdminConsole/TeamMembers/AddMember";
const routes = [
 
  {
    key: "dashboard",
    path: "/dashboard",
    href: "/dashboard",
    label: "Dashboard",
    component: <Dashboard />,
    // icon:<img src={ticketsActive} alt="Tickets" width="24px" />,
    icon: {"active":(<img src={ticketsActive} alt="Tickets" width="24px" />),"inactive":(<img src={tickets} alt="Tickets" width="24px" />)},
  },
  
  // {
  //   key: "reports",
  //   path: "/reports",
  //   href: "/reports",
  //   label: "Reports",
  //   component: <div>Reports</div>,
  //   icon: <img src={Reports} alt="Reports" width="24px" />,
  // },
  {
    key: "admin",
    path: "/admin",
    href: "/admin/skills",
    label: "Routing Console",
    // icon: <img  src={adminConsole} alt="Admin" width="24px" />,
    icon:{"active":(<img src={adminConsoleActive} alt="Admin" width="24px" />),"inactive":(<img src={adminConsole} alt="Admin" width="24px" />)},
    component: <AdminConsole  />,
    // component: <Skills />,
    tabs: [
      {
        key: "skills",
        path: "/admin/skills",
        label: "Skills",
        index: 0,
        
      },
      {
        key: "teammembers",
        path: "/admin/teammembers",
        label: "Team Members",
        index: 1,
      }, 
      {
        key: "productsla",
        path: "/admin/productsla",
        label: "Product SLA",
        index: 2,
      },
    ],
    subRoutes: [
      {
        key: "skills",
        path: "/admin/skills",
        label: "Skills",
        component: <Skills />,
      },
      {
        key: "teammembers",
        path: "/admin/teammembers",
        label: "Team Members",
        component: <PODMembers />,
        //component: <AddMember />
      },
      {
        key: "products",
        path: "/admin/productsla",
        label: "Products SLA",
        component: <ProductSLA />,
      },
      {
        key: "addSkills",
        path: "/admin/addSkills",
        label: "Add Skills",
        component: <AddSkill />
      },
      {
        key: "editSkill",
        path: "/admin/editSkill/:skillId",
        label: "Edit Skills",
        component: <EditSkill />
      },
      {
        key: "editteammember",
        path: "/admin/EditTeammember/:skillId",
        label: "Edit Teammember",
        component: <EditTeammember />
      },
      {
        key: "addsla",
        path: "/admin/addsla",
        label: "Add SLA",
        component: <AddSla />
      },
      {
        key: "editsla",
        path: "/admin/editsla/:skillId",
        label: "Edit SLA",
        component: <EditSla />
      },
      {
        key: "copysla",
        path: "/admin/copysla/:skillId",
        label: "Copy SLA",
        component: <CopySla />
      },
      {
        key: "addteammember",
        path: "/admin/addteammember",
        label: "Add Team Member",
        component: <AddMember />
      },
     
    ],
  },
];
export default routes;
