package br.unip.ads.pim.service;

import java.util.List;

import br.unip.ads.pim.domain.Usuario;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface ApiService {

    @POST("login")
    Call<Usuario> logar(@Body Usuario credenciais);

    @GET("usuarios")
    Call<List<Usuario>> listarUsuarios();
}
