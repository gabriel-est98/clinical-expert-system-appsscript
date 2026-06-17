# Sistema Experto de Triaje Clínico y Automatización Operativa con IA

## Descripción del Proyecto
Este proyecto consiste en el diseño y desarrollo de una herramienta interna inteligente (*Sistema Experto*) para el Departamento de Bienestar Universitario de la institución. La solución optimiza el flujo de atención médica mediante la automatización del proceso de triaje, la implementación de un motor de reglas clínicas, mecanismos avanzados de seguridad perimetral por código y la integración de Inteligencia Artificial para la generación de diagnósticos presuntivos sugeridos.

---

## El Problema Organizacional
El Departamento de Bienestar Universitario enfrentaba cuellos de botella críticos en la atención diaria de pacientes (estudiantes y docentes) debido a:
* **Procesos Administrativos Lentos:** El registro inicial de triaje por parte de enfermería se realizaba de forma manual o desestructurada, ralentizando el ingreso a consulta médica.
* **Falta de Soporte en la Decisión:** Los médicos no contaban con un resumen analítico inmediato que cruzara constantes vitales, escalas de salud mental (PHQ-2, GAD-2) e historial en tiempo real antes de interactuar con el paciente.
* **Vulnerabilidad de Datos Confidenciales:** Riesgo de exposición de datos médicos sensibles al no existir una separación estricta de permisos de visualización entre médicos, enfermeras y personal administrativo dentro de un mismo libro de trabajo.

---

## La Solución Propuesta (Arquitectura del Sistema)
Se desarrolló una aplicación nativa utilizando **Google Apps Script (JavaScript)** que transformó una hoja de cálculo en un software de gestión clínica seguro:

1. **Gobernanza y Seguridad Basada en Roles (`onOpen`):** Un script automatizado evalúa el correo electrónico del usuario activo al abrir el documento contra una lista blanca centralizada (`CORREOS_AUTORIZADOS`). Si el usuario no es personal médico o de enfermería calificado, el sistema oculta y protege automáticamente las pestañas confidenciales (`DASHBOARD_MEDICO`, `MOTOR_REGLAS`).
2. **Formulario Automatizado de Triaje:** Interfaz limpia con validación de datos para el ingreso rápido de constantes vitales por enfermería (Triaje de Emergencia, Datos Básicos).
3. **Motor de Reglas Clínicas:** El sistema analiza las variables ingresadas y activa reglas clínicas automatizadas, desplegando un **Diagnóstico Presuntivo Sugerido** con alertas visuales de condiciones críticas (Hiperglucemia moderada, Descontrol Hipertensivo, Ansiedad).

---

## Tecnologías y Habilidades Aplicadas
* **JavaScript / Google Apps Script:** Programación orientada a eventos para el control de la lógica del negocio, manejo de la API del entorno de hojas de cálculo y automatizaciones.
* **Seguridad y Control de Accesos:** Enmascaramiento de datos y protección dinámica de hojas basada en la identidad del usuario en tiempo real.
* **Ingeniería de Software para Analistas:** Uso de lógica condicional compleja para la traducción de protocolos médicos en algoritmos lógicos automáticos.
* **Integración LLM (Llama 3.3 vía Groq API):** Implementación de llamadas a la API de Groq mediante `UrlFetchApp` para procesar consultas médicas en tiempo real con latencia ultrabaja, configurando parámetros estrictos (`temperature: 0.2`) y "System Prompts" específicos para garantizar respuestas clínicas precisas, concisas y sin alucinaciones.

---

## Impacto y Resultados
* **Optimización del Tiempo Clínico:** Reducción drástica del tiempo de espera pre-consulta; el médico recibe un resumen ejecutivo estructurado del paciente antes de que ingrese al consultorio.
* **Cumplimiento de Privacidad:** Mitigación al 100% del riesgo de fuga de datos médicos confidenciales a personal no autorizado mediante scripting de seguridad.
* **Transformación Digital:** Migración exitosa de un proceso operativo manual a un flujo de trabajo inteligente y automatizado directamente en la nube.

---

## 📂 Estructura del Repositorio
* `src/`: Contiene el código fuente original en JavaScript (`Codigo.js`) desarrollado para la lógica del sistema, llamadas API de IA y control de seguridad perimetral.
* `sheets-templates/`: Capturas de pantalla e interfaces visuales del formulario de triaje y el panel de diagnóstico presuntivo médico.
