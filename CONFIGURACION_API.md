# 🔧 Configuración de APIs para YAG3R Community

Este archivo contiene las instrucciones para configurar las APIs reales para que la detección de streams funcione correctamente.

## 🟣 Configuración de Twitch API

### Paso 1: Registrar aplicación en Twitch
1. Ve a [Twitch Developers Console](https://dev.twitch.tv/console/apps)
2. Haz clic en "Register Your Application"
3. Completa el formulario:
   - **Name**: YAG3R Community Site
   - **OAuth Redirect URLs**: `http://localhost:8000` (para desarrollo)
   - **Category**: Website Integration

### Paso 2: Obtener credenciales
1. Una vez registrada, obtén:
   - **Client ID**: Se mostrará en el dashboard
   - **Client Secret**: Haz clic en "New Secret" para generarlo

### Paso 3: Configurar en el código
En `script.js`, reemplaza:

```javascript
const TWITCH_CONFIG = {
    CLIENT_ID: 'tu_client_id_real_aqui',
    ACCESS_TOKEN: null
};
```

## ⚠️ Importante: Seguridad

**NUNCA pongas el Client Secret en el código frontend**. Para producción, necesitas:

1. **Servidor Backend**: Maneja la autenticación OAuth
2. **Proxy API**: Tu servidor hace las llamadas a Twitch
3. **Variables de entorno**: Para credenciales sensibles

## 🛠️ Implementación para Producción

### Opción 1: Servidor Node.js simple
```javascript
// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/api/twitch/user/:username', async (req, res) => {
    // Lógica para obtener datos del usuario
});

app.get('/api/twitch/stream/:userId', async (req, res) => {
    // Lógica para obtener datos del stream
});
```

### Opción 2: Serverless Functions
- **Vercel Functions**
- **Netlify Functions** 
- **AWS Lambda**

## 📋 Funcionalidades Implementadas

✅ **Detección en tiempo real** si el streamer está en vivo
✅ **Imagen real del perfil** obtenida de Twitch
✅ **Información del juego** actual que está jugando
✅ **Número de espectadores** en tiempo real
✅ **Thumbnail del stream** cuando está en vivo
✅ **Actualización automática** cada 2 minutos
✅ **Sistema de fallback** en caso de errores de API
✅ **Timestamp de última actualización**

## 🔄 Estados de la página

### Cuando el streamer está EN VIVO:
- Indicador rojo parpadeante "EN VIVO"
- Thumbnail real del stream actual
- Juego que está jugando
- Número de espectadores en tiempo real
- Card con borde verde brillante

### Cuando el streamer está OFFLINE:
- Indicador gris "OFFLINE"  
- Thumbnail genérico offline
- Información de último stream
- Número de seguidores

## 🚀 Testing

Para probar sin API real, la página incluye:
- Datos simulados que funcionan inmediatamente
- Sistema de fallback que muestra información básica
- Logs en consola para debugging

## 📞 Soporte

Si necesitas ayuda configurando las APIs:
1. Revisa la [documentación oficial de Twitch](https://dev.twitch.tv/docs/api/)
2. Verifica que las credenciales estén correctas
3. Revisa la consola del navegador para errores

---

*Última actualización: Noviembre 2025*