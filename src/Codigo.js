function limpiarFormulario() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("FORMULARIO_INGRESO");
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Error: No se encontró la hoja llamada 'FORMULARIO_INGRESO'");
    return;
  }
  
  // Rango modificado a "C17:D20" para no tocar la fila 21
  var rangosA_Limpiar = [
    "G6:G14", "C22:C25", "C29:C35", "D45:D55", "G45:G54", "D57:D65", "G88:G91", // Celdas simples (actualizadas)
    "C17:D20", "C38:E38", "C39:E39", "C40:D41", "C42:E43", "C66:E68", "D71:E78", "E82:H83", "E85:H86" // Celdas combinadas
  ];
  
  sheet.getRangeList(rangosA_Limpiar).clearContent();
  
  SpreadsheetApp.getUi().alert("Formulario limpiado perfectamente.");
}

// =========================================================================
// MÓDULO DE IA CLÍNICA INTEGRADA (Actualizado a Llama 3.3)
// =========================================================================

function CONSULTAR_IA_MEDICA(pregunta) {
  if (!pregunta || pregunta == "") return "Esperando consulta de la doctora...";
  
  // 🔒 POR SEGURIDAD, LA API KEY HA SIDO OCULTADA EN ESTE REPOSITORIO PÚBLICO
  var apiKey = "TU_API_KEY_DE_GROQ_AQUI"; 
  
  // Usamos el endpoint estándar de OpenAI compatible con Groq
  var url = "https://api.groq.com/openai/v1/chat/completions";
  
  var payload = {
    "model": "llama-3.3-70b-versatile", // 👈 Modelo actualizado y activo
    "messages": [
      {
        "role": "system",
        "content": "Eres un asistente médico experto. Responde a la duda clínica del profesional de la salud de forma muy concisa, rigurosa y directa. Usa un máximo de 3 líneas. No des saludos ni advertencias, ve directo al protocolo o dosis."
      },
      {
        "role": "user",
        "content": pregunta
      }
    ],
    "temperature": 0.2 // Nivel bajo para mantener el rigor clínico y evitar alucinaciones
  };
  
  var opciones = {
    "method": "post",
    "contentType": "application/json",
    "headers": {
      "Authorization": "Bearer " + apiKey
    },
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };
  
  try {
    var respuesta = UrlFetchApp.fetch(url, opciones);
    var codigoRespuesta = respuesta.getResponseCode();
    var textoRespuesta = respuesta.getContentText();
    var json = JSON.parse(textoRespuesta);
    
    if (codigoRespuesta === 200) {
      return json.choices[0].message.content.trim();
    } else {
      return "❌ Error de IA (" + codigoRespuesta + "): " + (json.error.message || "Desconocido");
    }
  } catch(e) {
    return "❌ Error de conexión: " + e.toString();
  }
}

// CONFIGURACIÓN: Equipo de Bienestar Universitario (Correos Anonimizados por Privacidad)
const CORREOS_AUTORIZADOS = [
  "medico.principal@institucion.edu.ec",    // Médico
  "enfermeria.triaje@institucion.edu.ec",   // Enfermera
  "analista.datos@institucion.edu.ec",      // Analista
  "direccion.bienestar@institucion.edu.ec", // Directora del Departamento
  "admin.sistema@institucion.edu.ec"        // Sistema (Tu acceso)
];

/**
 * Función especial que se ejecuta AUTOMÁTICAMENTE 
 * cada vez que cualquier persona abre el archivo.
 */
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var usuarioActual = Session.getActiveUser().getEmail().toString().toLowerCase().trim();
  
  // Pestañas confidenciales que se van a proteger
  var hojasConfidenciales = ["DASHBOARD_MEDICO", "MOTOR_REGLAS", "INSTRUCCIONES"];
  
  // Verificamos si el correo de la persona está en la lista autorizada
  var esAutorizado = CORREOS_AUTORIZADOS.some(function(correo) {
    return correo.toLowerCase().trim() === usuarioActual;
  });
  
  if (esAutorizado) {
    // SI ES PARTE DEL EQUIPO O TÚ: Se muestran las pestañas automáticamente
    hojasConfidenciales.forEach(function(nombreHoja) {
      var hoja = ss.getSheetByName(nombreHoja);
      if (hoja) hoja.showSheet();
    });
  } else {
    // SI ES UN ESTUDIANTE O EXTERNO: Se ocultan de inmediato
    hojasConfidenciales.forEach(function(nombreHoja) {
      var hoja = ss.getSheetByName(nombreHoja);
      if (hoja) hoja.hideSheet();
    });
  }
}