package br.unip.ads.pim;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import org.parceler.Parcels;

import br.unip.ads.pim.domain.Usuario;

public class HomeActivity extends AppCompatActivity {

    public static final String EXTRA_USUARIO = "HomeActivity.usuario";

    private Usuario usuarioLogado;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        usuarioLogado = Parcels.unwrap(getIntent().getParcelableExtra(EXTRA_USUARIO));
        final TextView tvSaudacao = findViewById(R.id.tvSaudacao);
        tvSaudacao.setText(String.format("Bem vindo, %s.", usuarioLogado.getNome()));
    }
}
