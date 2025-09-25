package com.example.splashscreen;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.os.Handler;
import android.os.Looper;


import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;



public class MainActivity extends AppCompatActivity {

    Animation ghidora,kong;
    ImageView imgGhidora, imgKong;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        ghidora= AnimationUtils.loadAnimation(this,R.anim.ghidora_anim);
        kong= AnimationUtils.loadAnimation(this,R.anim.kong_anim);
        imgGhidora=findViewById(R.id.p1);
        imgKong=findViewById(R.id.p2);

        imgGhidora.startAnimation(ghidora);
        imgKong.startAnimation(kong);

        Handler handler=new Handler();
        handler.postDelayed(new Runnable(){
            @Override
            public void run(){
                startActivity(new Intent(MainActivity.this, MainActivity2.class));
                finish();
            }
        },3000);
    }
}