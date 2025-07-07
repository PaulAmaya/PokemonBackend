# 🏆 ENDPOINTS DE EQUIPOS - Backend Pokédex

## 📋 **FUNCIONALIDADES DE EQUIPOS**

### ✅ **Características Implementadas:**
- ✅ Crear equipos (con o sin Pokémon iniciales)
- ✅ Equipos de 1 a 6 Pokémon (no obligatorio tener 6)
- ✅ Agregar Pokémon a equipos existentes
- ✅ Quitar Pokémon de equipos
- ✅ Visualizar estadísticas de equipos
- ✅ Gestión por usuario (cada usuario sus equipos)
- ✅ Apodos para Pokémon en equipos

---

## 🎯 **ENDPOINTS DISPONIBLES**

### 1. **Crear Equipo** (Requiere Login)
**POST** `/equipo`
```json
// ENVÍA: Headers { Authorization: "Bearer TOKEN" }
{
  "nombre": "Mi Equipo Eléctrico",
  "pokemonIds": [1, 25, 81]  // Opcional: IDs de Pokémon iniciales
}

// RECIBE:
{
  "id": 1,
  "nombre": "Mi Equipo Eléctrico",
  "usuario": {
    "id": 1,
    "username": "usuario1",
    "email": "usuario1@email.com"
  },
  "pokemones": [
    {
      "id": 1,
      "apodo": null,
      "pokemon": {
        "id": 1,
        "nombre": "Bulbasaur",
        "tipo1": "Planta",
        "tipo2": "Veneno"
      }
    }
  ]
}
```

### 2. **Crear Equipo Vacío** (Requiere Login)
**POST** `/equipo`
```json
// ENVÍA: Headers { Authorization: "Bearer TOKEN" }
{
  "nombre": "Equipo Vacío"
}

// RECIBE: Equipo sin Pokémon, listo para agregar después
```

### 3. **Listar Todos los Equipos** (Público)
**GET** `/equipo`
```json
// ENVÍA: Nada
// RECIBE: Array con todos los equipos (datos básicos)
```

### 3b. **Listar Todos los Equipos Detallados** (Público)
**GET** `/equipo/detailed`
```json
// ENVÍA: Nada
// RECIBE: Array con todos los equipos (datos completos)
```

### 4. **Mis Equipos** (Requiere Login)
**GET** `/equipo/my-equipos`
```json
// ENVÍA: Headers { Authorization: "Bearer TOKEN" }
// RECIBE: Array con los equipos del usuario autenticado (datos completos)
[
  {
    "id": 1,
    "nombre": "Mi Equipo Eléctrico",
    "usuario": {
      "id": 1,
      "username": "usuario1"
    },
    "pokemones": [
      {
        "id": 1,
        "apodo": "Pika",
        "pokemon": {
          "id": 25,
          "nombre": "Pikachu",
          "tipo1": "Eléctrico",
          "tipo2": null,
          "imagen_url": "http://localhost:3000/uploads/pokemon/pikachu.png"
        },
        "item": {
          "id": 1,
          "nombre": "Poción",
          "imagen_url": "http://localhost:3000/uploads/items/pocion.png"
        },
        "habilidad": {
          "id": 1,
          "nombre": "Electricidad Estática",
          "es_oculta": false
        },
        "naturaleza": {
          "id": 1,
          "nombre": "Modesta",
          "stat_beneficiado": "Ataque Especial",
          "stat_perjudicado": "Ataque"
        },
        "evs": {
          "hp": 252,
          "ataque": 0,
          "defensa": 4,
          "sp_ataque": 252,
          "sp_defensa": 0,
          "velocidad": 0
        },
        "ivs": {
          "hp": 31,
          "ataque": 0,
          "defensa": 31,
          "sp_ataque": 31,
          "sp_defensa": 31,
          "velocidad": 31
        },
        "movimientos": [
          {
            "id": 1,
            "nombre": "Rayo",
            "tipo": "Eléctrico",
            "categoria": "especial",
            "poder": 90
          }
        ]
      }
    ]
  }
]
```

### 5. **Equipos de un Usuario** (Solo Admin)
**GET** `/equipo/user/:userId`
```json
// ENVÍA: Headers { Authorization: "Bearer ADMIN_TOKEN" }
// RECIBE: Array con los equipos del usuario especificado
```

### 6. **Obtener Equipo por ID** (Público)
**GET** `/equipo/:id`
```json
// ENVÍA: Nada
// RECIBE: Equipo específico con TODOS los datos completos (igual estructura que "Mis Equipos")
```

### 7. **Estadísticas de Equipo** (Público)
**GET** `/equipo/:id/stats`
```json
// ENVÍA: Nada
// RECIBE:
{
  "nombre": "Mi Equipo Eléctrico",
  "propietario": "usuario1",
  "totalPokemon": 3,
  "espaciosLibres": 3,
  "pokemones": [
    {
      "id": 25,
      "nombre": "Pikachu",
      "apodo": "Pika",
      "tipo1": "Eléctrico",
      "tipo2": null,
      "imagen_url": "http://localhost:3000/uploads/pokemon/pikachu.png",
      "item": {
        "id": 1,
        "nombre": "Poción",
        "imagen_url": "http://localhost:3000/uploads/items/pocion.png"
      },
      "habilidad": {
        "id": 1,
        "nombre": "Electricidad Estática",
        "es_oculta": false
      },
      "naturaleza": {
        "id": 1,
        "nombre": "Modesta",
        "stat_beneficiado": "Ataque Especial",
        "stat_perjudicado": "Ataque"
      },
      "evs": {
        "hp": 252,
        "ataque": 0,
        "defensa": 4,
        "sp_ataque": 252,
        "sp_defensa": 0,
        "velocidad": 0
      },
      "ivs": {
        "hp": 31,
        "ataque": 0,
        "defensa": 31,
        "sp_ataque": 31,
        "sp_defensa": 31,
        "velocidad": 31
      },
      "movimientos": [
        {
          "id": 1,
          "nombre": "Rayo",
          "tipo": "Eléctrico",
          "categoria": "especial",
          "poder": 90
        }
      ]
    }
  ]
}
```

### 8. **Agregar Pokémon a Equipo** (Requiere Login)
**POST** `/equipo/:id/add-pokemon`
```json
// ENVÍA: Headers { Authorization: "Bearer TOKEN" }
{
  "pokemonId": 25,
  "apodo": "Pika"  // Opcional
}

// RECIBE: Equipo actualizado con el nuevo Pokémon
```

### 9. **Quitar Pokémon de Equipo** (Requiere Login)
**DELETE** `/equipo/:id/remove-pokemon/:pokemonId`
```json
// ENVÍA: Headers { Authorization: "Bearer TOKEN" }
// RECIBE: Equipo actualizado sin el Pokémon removido
```

### 10. **Actualizar Equipo** (Requiere Login)
**PATCH** `/equipo/:id`
```json
// ENVÍA: Headers { Authorization: "Bearer TOKEN" }
{
  "nombre": "Nuevo Nombre de Equipo"
}

// RECIBE: Equipo actualizado
```

### 11. **Eliminar Equipo** (Requiere Login)
**DELETE** `/equipo/:id`
```json
// ENVÍA: Headers { Authorization: "Bearer TOKEN" }
// RECIBE:
{
  "message": "Equipo 'Mi Equipo Eléctrico' eliminado exitosamente"
}
```

---

## 🔒 **PERMISOS Y VALIDACIONES**

### **Permisos:**
- 🌐 **Públicos:** Listar equipos, ver equipo por ID, estadísticas
- 🔒 **Usuario:** Crear, actualizar, eliminar sus propios equipos
- 🔐 **Admin:** Ver equipos de cualquier usuario

### **Validaciones:**
- ✅ Máximo 6 Pokémon por equipo
- ✅ Mínimo 1 Pokémon para crear equipo (opcional)
- ✅ No duplicar Pokémon en el mismo equipo
- ✅ Verificar que el Pokémon existe antes de agregarlo
- ✅ Solo el propietario puede modificar su equipo

### **Reglas de Negocio:**
- 📝 Nombre del equipo es obligatorio
- 🎯 Equipos pueden estar incompletos (1-5 Pokémon)
- 🚫 No es obligatorio tener 6 Pokémon para "cerrar" el equipo
- 👤 Cada usuario puede tener múltiples equipos
- 🏷️ Los Pokémon pueden tener apodos en el equipo

---

## 📊 **EJEMPLOS DE USO**

### **Flujo Típico:**
1. **Crear equipo vacío:** `POST /equipo { "nombre": "Mi Equipo" }`
2. **Agregar Pokémon:** `POST /equipo/1/add-pokemon { "pokemonId": 25 }`
3. **Agregar más Pokémon:** `POST /equipo/1/add-pokemon { "pokemonId": 6, "apodo": "Charizard" }`
4. **Ver estadísticas:** `GET /equipo/1/stats`
5. **Quitar Pokémon:** `DELETE /equipo/1/remove-pokemon/25`

### **Casos de Uso:**
- 🏆 **Equipos competitivos:** 6 Pokémon completos
- 🎮 **Equipos casuales:** 3-4 Pokémon favoritos
- 🔄 **Equipos en desarrollo:** Ir agregando Pokémon gradualmente
- 👥 **Equipos temáticos:** Por tipo, región, etc.

¡Total: **12 endpoints funcionales** para gestión completa de equipos! 🚀

### **Próximos Pasos Opcionales:**
- 🔧 Configurar IVs/EVs para Pokémon en equipos
- ⚔️ Asignar movimientos específicos
- 🎒 Equipar objetos/items
- 🧬 Seleccionar habilidades
- 📊 Estadísticas avanzadas de equipo

---

## 📊 **DATOS COMPLETOS INCLUIDOS**

### **✅ Endpoints con Datos Completos:**
- 🔍 **`GET /equipo/:id`** - Equipo específico con todos los detalles
- 👤 **`GET /equipo/my-equipos`** - Mis equipos con datos completos  
- 👥 **`GET /equipo/user/:userId`** - Equipos de usuario (admin) con datos completos
- 📈 **`GET /equipo/:id/stats`** - Estadísticas detalladas con toda la información
- 🔧 **`POST /equipo/:id/add-pokemon`** - Devuelve equipo actualizado completo
- ❌ **`DELETE /equipo/:id/remove-pokemon/:pokemonId`** - Devuelve equipo actualizado completo

### **📋 Endpoints con Datos Básicos:**
- 🌐 **`GET /equipo`** - Lista todos los equipos (solo datos básicos para rendimiento)
- 🔍 **`GET /equipo/detailed`** - Lista todos los equipos con datos completos

### **🎯 Información Incluida en Datos Completos:**
```json
{
  "pokemones": [
    {
      "pokemon": {
        "id", "nombre", "tipo1", "tipo2", "imagen_url",
        "base_hp", "base_ataque", "base_defensa", 
        "base_sp_ataque", "base_sp_defensa", "base_velocidad"
      },
      "apodo": "Nombre personalizado",
      "item": { "id", "nombre", "imagen_url" },
      "habilidad": { "id", "nombre", "es_oculta" },
      "naturaleza": { "id", "nombre", "stat_beneficiado", "stat_perjudicado" },
      "evs": { "hp", "ataque", "defensa", "sp_ataque", "sp_defensa", "velocidad" },
      "ivs": { "hp", "ataque", "defensa", "sp_ataque", "sp_defensa", "velocidad" },
      "movimientos": [
        { "id", "nombre", "tipo", "categoria", "poder" }
      ]
    }
  ]
}
```

### **⚡ Optimización:**
- **Datos básicos** para listados generales (mejor rendimiento)
- **Datos completos** para equipos específicos y gestión detallada
- **Todas las relaciones** incluidas automáticamente donde se necesitan
