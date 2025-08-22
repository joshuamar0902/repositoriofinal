package com.example.propinas;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {

    EditText dinero;
    EditText persons;
    Button calcular;
    TextView resultado;
    RadioButton porcentaje1;
    RadioButton porcentaje2;
    RadioButton porcentaje3;
    RadioGroup grupoporcentajes;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        dinero=findViewById(R.id.monto);
        persons=findViewById(R.id.cantpersonas);
        calcular=findViewById(R.id.calcula);
        resultado=findViewById(R.id.result);
        porcentaje1=findViewById(R.id.cinco);
        porcentaje2=findViewById(R.id.diez);
        porcentaje3=findViewById(R.id.quince);
        grupoporcentajes=findViewById(R.id.gruporad);





        calcular.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                double monto=Double.parseDouble(dinero.getText().toString());
                double cantpersonas=Double.parseDouble((persons.getText().toString()));
                //imc = peso / estatura al cuadrado
                double porcentaje=0;

                double selectId=grupoporcentajes.getCheckedRadioButtonId();
                if (selectId==R.id.cinco){
                    porcentaje = .05;
                }else if(selectId==R.id.diez){
                    porcentaje=.10;

                }else if(selectId==R.id.quince){
                    porcentaje=.15;
                }

                double propinatotal=monto*porcentaje;

                double propinaequitativa=propinatotal/cantpersonas;
                resultado.setText(String.valueOf(propinaequitativa));
            }
        });
    }
}
