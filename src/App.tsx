import React, { useState } from "react";
import { generateItems } from "./utils";
import ThemeProvider from "./@context/ThemeProvider";
import Template from "./@component/layout/Template";
import AccountProvider from "./@context/AccountProvider";
import NotificationProvider from "./@context/NotificationProvider";
import Header from "./@component/layout/Header";
import NotificationSystem from "./@component/feedback/NotificationSystem";
import ComplexForm from "./@component/form/ComplexForm";
import ItemList from "./@component/data-display/ItemList";
import { usePreservedCallback } from "./@lib/hooks/usePreservedCallback";

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [items, setItems] = useState(generateItems(1000));

  const handleAddItemsButtonClick = usePreservedCallback(() => {
    setItems((prevItems) => [...prevItems, ...generateItems(1000, prevItems.length)]);
  });

  return (
    <AccountProvider>
      <ThemeProvider>
        <NotificationProvider>
          <Template>
            <Header />
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 md:pr-4">
                  <ItemList items={items} onAddItemsButtonClick={handleAddItemsButtonClick} />
                </div>
                <div className="w-full md:w-1/2 md:pl-4">
                  <ComplexForm />
                </div>
              </div>
            </div>
            <NotificationSystem />
          </Template>
        </NotificationProvider>
      </ThemeProvider>
    </AccountProvider>
  );
};

export default App;
