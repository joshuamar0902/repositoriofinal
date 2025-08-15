package com.example.retoclase14082025;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    EditText user, contra;
    Button btnLog, btnCancel;
    TextView txtCorrecto, txtIncorrecto;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        // Vincular elementos del XML
        user = findViewById(R.id.user);
        contra = findViewById(R.id.contra);
        btnLog = findViewById(R.id.btnlog);
        btnCancel = findViewById(R.id.btncancel);
        txtCorrecto = findViewById(R.id.txtcorrecto);
        txtIncorrecto = findViewById(R.id.txtincorrecto);

        // Al inicio ocultamos los mensajes
        txtCorrecto.setVisibility(View.GONE);
        txtIncorrecto.setVisibility(View.GONE);

        // Acción del botón LOGIN
        btnLog.setOnClickListener(v -> {
            String usuario = user.getText().toString();
            String password = contra.getText().toString();

            if (usuario.equals("admin") && password.equals("1234")) {
                txtCorrecto.setVisibility(View.VISIBLE);
                txtIncorrecto.setVisibility(View.GONE);
            } else {
                txtCorrecto.setVisibility(View.GONE);
                txtIncorrecto.setVisibility(View.VISIBLE);
            }
        });

        // Acción del botón CANCEL
        btnCancel.setOnClickListener(v -> {
            user.setText("");
            contra.setText("");
            txtCorrecto.setVisibility(View.GONE);
            txtIncorrecto.setVisibility(View.GONE);
        });
    }
}
