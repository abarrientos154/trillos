
const routes = [
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    meta: { botonchat: true },
    children: [
      // Administrador
      { path: '/inicio_administrador', component: () => import('pages/admin/Inicio.vue') },
      { path: '/proveedores', component: () => import('pages/admin/Proveedores.vue') },
      { path: '/clientes', component: () => import('pages/admin/Clientes.vue') },
      { path: '/proveedores_pendientes', component: () => import('pages/admin/Pendientes.vue') },
      { path: '/descripcionusuario/:id', component: () => import('pages/admin/DescripcionUsuario.vue') },
      { path: '/editarusuario/:id', component: () => import('pages/admin/Editarusuario.vue') },
      { path: '/editar_productoprove/:id', component: () => import('pages/admin/EditarProducto.vue') },
      { path: '/reportes_usuarios', component: () => import('pages/admin/Reportes.vue') },
      // Proveedor
      { path: '/inicio_proveedor', component: () => import('pages/proveedor/Inicio.vue'), meta: { botonchat: true } },
      { path: '/productos', component: () => import('pages/proveedor/Productos.vue'), meta: { botonchat: true } },
      { path: '/registroproductos', component: () => import('pages/proveedor/RegistroProductos.vue'), meta: { botonchat: false } },
      { path: '/editar_producto/:id', component: () => import('pages/proveedor/RegistroProductos.vue'), meta: { botonchat: false } },
      { path: '/descripcionsolicitud/:id', component: () => import('pages/proveedor/DescripcionNecesidad.vue'), meta: { botonchat: false } },
      { path: '/allnecesidades', component: () => import('pages/proveedor/Allnecesidades.vue'), meta: { botonchat: false } },
      // Cliente
      { path: '/inicio_cliente', component: () => import('pages/cliente/Inicio.vue'), meta: { botonchat: true } },
      { path: '/solicitudes', component: () => import('pages/cliente/Necesidades.vue'), meta: { botonchat: true } },
      { path: '/registronecesidades', component: () => import('pages/cliente/RegistroNecesidades.vue'), meta: { botonchat: false } },
      { path: '/editar_solicitud/:id', component: () => import('pages/cliente/RegistroNecesidades.vue'), meta: { botonchat: false } },
      { path: '/tienda/:id', component: () => import('pages/cliente/Tienda.vue'), meta: { botonchat: true } },
      { path: '/descripcionproducto/:id', component: () => import('pages/cliente/DescripcionProducto.vue'), meta: { botonchat: false } },
      // Generales
      { path: '/mis_chats', component: () => import('pages/AllChats.vue'), meta: { botonchat: false } },
      { path: '/mis_cotizaciones', component: () => import('pages/MisCotizaciones.vue'), meta: { botonchat: true } },
      { path: '/cotizacion/:id/:necesidad_id', component: () => import('pages/VerCotizacion.vue'), meta: { botonchat: false } },
      { path: '/filtrar_categorias/:id', component: () => import('pages/FiltradoCategorias.vue'), meta: { botonchat: true } },
      { path: '/Datos', component: () => import('pages/Datauser.vue'), meta: { botonchat: true } },
      { path: '/Datosedit', component: () => import('pages/Userdata.vue'), meta: { botonchat: false } },
      { path: '/reportes', component: () => import('pages/Reportes.vue'), meta: { botonchat: true } },
      { path: '/ver_reporte/:id/:id_cotizacion', component: () => import('pages/VerReporte.vue'), meta: { botonchat: false } }
    ]
  },
  { path: '/chat/:id', component: () => import('pages/Chat.vue') },
  { path: '/login', component: () => import('pages/Login.vue') },
  { path: '/registro', component: () => import('pages/registro/TipoRegistro.vue') },
  { path: '/registro/taller', component: () => import('pages/registro/RegistroProveedor.vue') },
  { path: '/registro/cliente', component: () => import('pages/registro/RegistroCliente.vue') },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    redirect: '/login'
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
