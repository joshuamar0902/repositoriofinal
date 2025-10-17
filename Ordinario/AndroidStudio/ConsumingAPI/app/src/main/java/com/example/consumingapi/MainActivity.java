package com.example.consumingapi;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

// Nota: Eliminamos la importación de TextInputEditText ya que usamos la clase base EditText

public class MainActivity extends AppCompatActivity {

    Button btn;
    // DECLARACIÓN: Usamos el tipo base EditText
    EditText inputLongitud;
    EditText inputLatitud;
    TextView tv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this); // Mantener esta línea
        setContentView(R.layout.activity_main);

        // Configuración de insets (mantener para EdgeToEdge)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        // 1. ASIGNACIÓN DE VISTAS (Asumiendo que el ID de Longitud fue corregido a editTextLongitud)
        btn = findViewById(R.id.button);
        inputLatitud = findViewById(R.id.textInputEditText);
        inputLongitud = findViewById(R.id.editTextLongitud); // <- ¡ID CORREGIDO!
        tv = findViewById(R.id.textView4);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                // 2. EXTRACCIÓN: Obtener los valores ingresados por el usuario
                String lat = inputLatitud.getText().toString();
                String lon = inputLongitud.getText().toString();

                if (lat.isEmpty() || lon.isEmpty()) {
                    Toast.makeText(MainActivity.this, "Ingrese Latitud y Longitud.", Toast.LENGTH_SHORT).show();
                    return;
                }

                // --- Configuración de Volley ---
                RequestQueue queue = Volley.newRequestQueue(MainActivity.this);

                // 3. CONSTRUCCIÓN DINÁMICA DE LA URL
                String url ="https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&hourly=temperature_2m";

                StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                        new Response.Listener<String>() {
                            @Override
                            public void onResponse(String response) {
                                // Muestra las coordenadas y el inicio de la respuesta (los primeros 500 caracteres)
                                int endIndex = Math.min(response.length(), 500);
                                tv.setText("Coordenadas enviadas: " + lat + ", " + lon +
                                        "\nRespuesta (Inicio): " + response.substring(0, endIndex));
                            }
                        }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        tv.setText("Error al conectar o recibir respuesta: " + error.getMessage());
                    }
                });

                queue.add(stringRequest);
            }
        });
    }
}