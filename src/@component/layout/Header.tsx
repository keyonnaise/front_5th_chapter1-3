import { useAccountActionsContext, useAccountStateContext } from "../../@context/AccountProvider";
import { useNotificationActionsContext } from "../../@context/NotificationProvider";
import { useThemeActionsContext, useThemeStateContext } from "../../@context/ThemeProvider";
import { memo } from "../../@lib/hocs";
import { usePreservedCallback } from "../../@lib/hooks/usePreservedCallback";
import { renderLog } from "../../utils";

function Header() {
  renderLog("Header rendered");

  const { user } = useAccountStateContext("Header");
  const { login, logout } = useAccountActionsContext("Header");
  const { theme } = useThemeStateContext("Header");
  const { toggleTheme } = useThemeActionsContext("Header");
  const { addNotification } = useNotificationActionsContext("Header");

  const handleLogin = usePreservedCallback(() => {
    // 실제 애플리케이션에서는 사용자 입력을 받아야 합니다.
    login("user@example.com", "password");
    addNotification("success", "성공적으로 로그인되었습니다");
  });

  const handleLogout = usePreservedCallback(() => {
    logout();
    addNotification("info", "로그아웃되었습니다");
  });

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">샘플 애플리케이션</h1>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            {theme === "light" ? "다크 모드" : "라이트 모드"}
          </button>
          {user ? (
            <div className="flex items-center">
              <span className="mr-2">{user.name}님 환영합니다!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
