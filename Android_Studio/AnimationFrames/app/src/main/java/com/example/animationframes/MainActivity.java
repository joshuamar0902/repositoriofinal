package com.example.animationframes;

import android.graphics.drawable.AnimationDrawable;
import android.os.Bundle;
import android.widget.ImageView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {

    ImageView imagenAnimada;
    AnimationDrawable animarGatito;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        imagenAnimada=findViewById(R.id.animation_container);
        imagenAnimada.setBackgroundResource(R.drawable.gatito_anime);
        animarGatito=(AnimationDrawable) imagenAnimada.getBackground();
        animarGatito.run();


    }
}