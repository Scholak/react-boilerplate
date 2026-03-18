import { Suspense, useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from '@tanstack/react-router'
import { Layout, Menu, Avatar, Dropdown, Spin, type MenuProps } from 'antd'
import {
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from '@ant-design/icons'
import { useAuth, useSignOut } from '@/modules/auth/auth.hooks'
import { getInitials } from '@/core/utils/get-initials'
import { config } from '@/core/config'

const { Sider, Header, Content } = Layout

export function DashboardLayout() {
  const { data: user } = useAuth()
  const signOut = useSignOut()
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  useEffect(() => {
    if (isMobile) setCollapsed(true)
  }, [location.pathname])

  const selectedKey = ['/users', '/profile'].find((k) => location.pathname.startsWith(k)) ?? ''

  const sideMenuItems: MenuProps['items'] = [
    {
      key: '/users',
      icon: <TeamOutlined />,
      label: 'Kullanıcılar',
      onClick: () => navigate({ to: '/users' }),
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Profil',
      onClick: () => navigate({ to: '/profile' }),
    },
  ]

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profil',
      onClick: () => navigate({ to: '/profile' }),
    },
    { type: 'divider' },
    {
      key: 'sign-out',
      icon: <LogoutOutlined />,
      label: 'Çıkış Yap',
      danger: true,
      onClick: async () => {
        signOut()
        await navigate({ to: '/sign-in' })
      },
    },
  ]

  return (
    <Layout className="min-h-screen">
      {!collapsed && isMobile && (
        <div className="fixed inset-0 bg-black/40 z-99" onClick={() => setCollapsed(true)} />
      )}
      <Sider
        breakpoint="lg"
        collapsedWidth={0}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        onBreakpoint={(broken) => {
          setIsMobile(broken)
          setCollapsed(broken)
        }}
        trigger={null}
        width={220}
        style={{ position: 'fixed', height: '100vh', left: 0, zIndex: 100 }}
      >
        <div
          className="flex items-center gap-3 px-5 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="shrink-0 w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {config.appName.charAt(0).toUpperCase()}
            </span>
          </div>
          {!collapsed && (
            <span className="text-white/90 font-semibold text-sm truncate">{config.appName}</span>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={sideMenuItems}
          style={{ background: 'transparent', marginTop: 8 }}
        />
      </Sider>

      <Layout
        style={{ marginLeft: collapsed || isMobile ? 0 : 220, transition: 'margin-left 0.2s' }}
      >
        <Header
          className="flex justify-between items-center px-4! sm:px-6!"
          style={{
            background: '#fff',
            borderBottom: '1px solid #f0f0f0',
            height: 60,
            lineHeight: '60px',
            position: 'sticky',
            top: 0,
            zIndex: 99,
          }}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
          >
            {collapsed ? (
              <MenuUnfoldOutlined style={{ fontSize: 18 }} />
            ) : (
              <MenuFoldOutlined style={{ fontSize: 18 }} />
            )}
          </button>

          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            arrow
            trigger={['click']}
            open={profileMenuOpen}
            onOpenChange={setProfileMenuOpen}
          >
            <div className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-100 px-3 py-1.5 rounded-xl transition-colors">
              <Avatar size={34} style={{ background: '#4f46e5', fontSize: 13, flexShrink: 0 }}>
                {getInitials(user.firstName, user.lastName)}
              </Avatar>
              <div className="hidden sm:block">
                <div className="text-sm font-medium leading-none mb-0.5">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
              <DownOutlined
                className="text-gray-400 text-xs transition-transform duration-200"
                style={{ transform: profileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </div>
          </Dropdown>
        </Header>

        <Content className="px-4 sm:px-6 py-6" style={{ minHeight: 'calc(100vh - 60px)' }}>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-64">
                <Spin size="large" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  )
}
