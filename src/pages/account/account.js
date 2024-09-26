import { useState } from "react";
import { BasicLayout } from "@/layouts";
import { Info, Setting, Address, Wishlist } from "@/components/Account";
import { Tab } from "semantic-ui-react";
import styles from "./account.module.scss";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { Separator } from "@/components/Shared";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [reload, setReload] = useState(false);

  if (!user) {
    router.push("/");
    return null;
  }

  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Mis pedidos",
      render: () => (
        <Tab.Pane attached={false}>
          <p>Mis Pedidos...</p>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Lista de Deseos",
      render: () => (
        <Tab.Pane attached={false}>
          <Wishlist />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Direcciones",
      render: () => (
        <Tab.Pane attached={false}>
          <Address.AddAddress onReload={onReload} />
          <Address.ListAddresses reload={reload} onReload={onReload} />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 20, icon: "setting", content: "Ajustes" },
      render: () => (
        <Tab.Pane attached={false}>
          <Setting.ChangeNameForm />
          <div className={styles.containerForms}>
            <Setting.ChangeEmailForm />
            <Setting.ChangePasswordForm />
          </div>
          <Separator height={80}></Separator>
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 21,
        icon: "log out",
        content: "",
        onClick: logout,
      },
    },
  ];

  return (
    <>
      <BasicLayout isContainer relative>
        <Info />
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes}
          className={styles.tabs}
        ></Tab>
      </BasicLayout>
    </>
  );
}
