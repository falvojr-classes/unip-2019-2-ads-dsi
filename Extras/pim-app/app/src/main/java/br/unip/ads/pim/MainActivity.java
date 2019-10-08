package br.unip.ads.pim;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import org.parceler.Parcels;

import br.unip.ads.pim.domain.Usuario;
import br.unip.ads.pim.service.ApiService;
import br.unip.ads.pim.service.ApiSingleton;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = MainActivity.class.getSimpleName();

    private EditText etUsername;
    private EditText etSenha;
    private Button btEntrar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        etUsername = findViewById(R.id.etUsername);
        etSenha = findViewById(R.id.etSenha);
        btEntrar = findViewById(R.id.btEntrar);

        btEntrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Usuario credenciais = new Usuario();
                if (isValidEmail(etUsername.getText().toString())) {
                    credenciais.setEmail(etUsername.getText().toString());
                } else {
                    credenciais.setCpf(etUsername.getText().toString());
                }
                credenciais.setSenha(etSenha.getText().toString());

                final ApiService api = ApiSingleton.get().getApiService();
                api.logar(credenciais).enqueue(new Callback<Usuario>() {
                    @Override
                    public void onResponse(Call<Usuario> call, Response<Usuario> response) {
                        if (response.isSuccessful()) {
                            final Usuario usuario = response.body();
                            String msg = String.format("Bem vindo %s!", usuario.getNome());
                            mostrarMensagem(msg);
                            redirecionarParaHome(usuario);
                        } else {
                            mostrarMensagem(ApiSingleton.get().getMensagemErro(response.errorBody()));
                        }
                    }

                    @Override
                    public void onFailure(Call<Usuario> call, Throwable t) {
                        mostrarMensagem(t.getMessage());
                    }
                });
            }
        });
    }

    private void redirecionarParaHome(Usuario usuario) {
        Intent home = new Intent(this, HomeActivity.class);
        home.putExtra(HomeActivity.EXTRA_USUARIO, Parcels.wrap(usuario));
        startActivity(home);
    }

    private void mostrarMensagem(String msg) {
        Snackbar.make(btEntrar, msg, Snackbar.LENGTH_LONG).show();
    }

    /**
     * https://stackoverflow.com/a/7882950/3072570
     */
    public boolean isValidEmail(CharSequence target) {
        return !TextUtils.isEmpty(target) && Patterns.EMAIL_ADDRESS.matcher(target).matches();
    }
}
